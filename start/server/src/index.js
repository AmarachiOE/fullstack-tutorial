// import ApolloServer class from  apollo-server
const { ApolloServer } = require('apollo-server');

// import our schema from  src/schema.js
const typeDefs = require('./schema');

// Next, let's create a new instance of ApolloServer and pass our schema to the typeDefs property on the configuration object. (typdeDefs: typeDefs)
const server = new ApolloServer({ typeDefs });


// Run Server
server.listen().then(({ url }) => {
    console.log(`🚀 Chichi! Server ready at ${url}`);
})