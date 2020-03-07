const { ApolloServer } = require("apollo-server");

const { tables, clients } = require("./data");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    clients,
    tables
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ${url}`);
});
