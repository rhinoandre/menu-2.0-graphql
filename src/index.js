const { ApolloServer } = require("apollo-server");

const { tables, clients } = require("./data");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const convertAuthToEmail = authorization =>
  Buffer.from(authorization, "base64").toString();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    clients,
    tables
  }),
  context: ({ req, connection }) => {
    if (connection) {
      return connection.context;
    }

    return {
      email: convertAuthToEmail(req.headers.authorization)
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ${url}`);
});
