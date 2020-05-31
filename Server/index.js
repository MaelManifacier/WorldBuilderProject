import { ApolloServer } from 'apollo-server'
const typeDefs = require('./src/schema.js')
const resolvers = require('./src/resolvers.js')

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});