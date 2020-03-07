const Query = {
  tables(_, __, { dataSources }) {
    const tables = [...Object.values(dataSources.tables.getTables())];

    return tables.map(
      (table) => ({
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
  me(_, __, { email }, { dataSources }) {
    return dataSources.clients.getClient(email);
  }
};

module.exports = Query;
