const { ApolloServer } = require("apollo-server");

const { tables, clients } = require("./data");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const convertAuthToEmail = authorization =>
  Buffer.from(authorization, "base64").toString();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect(connectionParams, webSocket) {
      if (connectionParams.authorization) {
        return {
          email: convertAuthToEmail(connectionParams.authorization)
        };
      }

      throw new Error("Missing auth token!");
    }
  },
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

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
