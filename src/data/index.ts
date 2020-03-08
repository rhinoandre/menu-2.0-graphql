class Tables {
  tables = {
    1: {
      id: 1,
      number: 1,
      clients: []
    },
    2: {
      id: 2,
      number: 2,
      clients: []
    },
    3: {
      id: 3,
      number: 3,
      clients: []
    },
    4: {
      id: 4,
      number: 4,
      clients: []
    }
  };

  initialize() {}

  getTables() {
    const tables = [...Object.values(this.tables)];

    return tables;
  }

  getTable(id) {
    return this.tables[id];
  }

  setClient(tableId, clientId) {
    const table = this.getTable(tableId);
    table.clients = [...new Set([...table.clients, clientId])];
    return table;
  }
}

let clientId = 0;
class Clients {
  clients = {};

  initialize() {}

  getClients() {
    return Object.values(this.clients);
  }

  getClient(id) {
    return this.clients[id];
  }

  createClient({ name, email }) {
    const id = clientId++;
    const client = {
      id,
      name,
      email
    };
    this.clients[id] = client;
    return client;
  }

  setTable(tableId, clientId) {
    const client = this.getClient(clientId);
    client.tableId = tableId;
    return client;
  }
}

export const tables = new Tables();
export const clients = new Clients();
