const Mutation = {
  occupyTable(_, { tableId, clientId }, { dataSources }) {
    const client = dataSources.clients.setTable(tableId, clientId);
    const table = dataSources.tables.setClient(tableId, clientId);
    client.tableId = tableId;

    const cientWithTable = {
      ...client,
      table: table
    };

    return {
      code: "200",
      success: true,
      table: {
        ...table,
        clients: table.clients.map(id => dataSources.clients.getClient(id))
      },
      client: cientWithTable
    };
  },
  createClient(_, { client }, { dataSources }) {
    return dataSources.clients.createClient(client);
  }
};

module.exports = Mutation;
