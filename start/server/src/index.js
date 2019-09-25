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
const LaunchAPI = require('./datasources/launch');

// connect resolver map to Apollo Server
const resolvers = require('./resolvers');

// #################  SETTING UP SERVER

const store = createStore();


// Next, let's create a new instance of ApolloServer and pass our schema to the typeDefs property on the configuration object. (typdeDefs: typeDefs)
const server = new ApolloServer({ 
    typeDefs,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new userAPI({ store })
    }) 
});


// Run Server
server.listen().then(({ url }) => {
    console.log(`🚀 Chichi! Server ready at ${url}`);
})