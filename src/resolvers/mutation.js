const { NEW_CLIENT_ON_TABLE, pubsub } = require("./subscription");

const Mutation = {
  occupyTable(_, { tableId, clientId }, { dataSources }) {
    const client = dataSources.clients.setTable(tableId, clientId);
    const table = dataSources.tables.setClient(tableId, clientId);
    client.tableId = tableId;

    const cientWithTable = {
      ...client,
      table: table
    };

    pubsub.publish(NEW_CLIENT_ON_TABLE, {
      newClientOnTable: cientWithTable
    });

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
