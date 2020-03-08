import { ApolloServer } from "apollo-server";

import { tables, clients } from "./data";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const convertAuthToEmail = authorization =>
  Buffer.from(authorization, "base64").toString();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect(connectionParams: any, webSocket) {
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

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => console.log('Module disposed. '));
}