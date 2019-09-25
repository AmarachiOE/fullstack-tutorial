// #################  IMPORTS

// import ApolloServer class from  apollo-server
const { ApolloServer } = require('apollo-server');

// import our schema from  src/schema.js
const typeDefs = require('./schema');

// import createStore function to set up/create database
const { createStore } = require('./utils');

// import Launch API data source that connects our REST API
const LaunchAPI = require('./datasources/launch');

// import User API data source that connects SQL database
const UserAPI = require('./datasources/user');

// connect resolver map to Apollo Server
const resolvers = require('./resolvers');

// #################  SETTING UP SERVER

const store = createStore();


// Next, let's create a new instance of ApolloServer and pass our schema to the typeDefs property on the configuration object. (typ33eDefs: typeDefs)

// add context: for user authentication
const server = new ApolloServer({ 
    context: async ({ req }) => {
        // simple auth check on every request
        const auth = (req.headers && req.headers.authorization) || '';
        const email = Buffer.from(auth, 'base64').toString('ascii');
        // if the email isn't formatted validly, return null for user
        if (!isEmail.validate(email)) return { user: null };
        // find a user by their email
        const users = await store.users.findOrCreate({ where: { email } });
        const user = users && users[0] ? users[0] : null;
    
        return { user: { ...user.dataValues } };
      },
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    }) 
});


// Run Server
server.listen().then(({ url }) => {
    console.log(`🚀 Chichi! Server ready at ${url}`);
})