import { IResolverObject } from "apollo-server";

const Query: IResolverObject = {
  tables(_, __, { dataSources }) {
    const tables = [...Object.values(dataSources.tables.getTables())];

    return tables.map(
      (table: any) => ({
        ...table,
        clients: table.clients.map(clientId => dataSources.clients.getClient(clientId))
      })
    );
  },
  table(_, { id }, { dataSources }) {
    return dataSources.tables.getTable(id);
  },
  clients(_, __, { dataSources }) {
    return Object.values(dataSources.clients.getClients());
  },
  client(_, { email }, { dataSources }) {
    return dataSources.clients.getClient(email);
  },
  me(_, __, { email }, { dataSources }: any) {
    return dataSources.clients.getClient(email);
  }
};

export default Query;
