const { ApolloServer } = require("apollo-server");

const { tables, clients } = require("./data");
const typeDefs = require("./schema");

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    clients,
    tables
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ${url}`);
});
