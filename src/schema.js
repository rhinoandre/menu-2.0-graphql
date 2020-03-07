const { gql } = require("apollo-server");

// The GraphQL Schema
const typeDefs = gql`
  type Client {
    id: ID!
    name: String!
    email: String!
    table: Table
  }
  type Table {
    id: ID!
    "Number that will be found on the table"
    number: Int!
    "List clients that are currently using the table"
    clients: [Client]!
  }

  type Query {
    tables: [Table]!
    table(id: ID!): Table
    client(email: String!): Client
    clients: [Client]!
    me: Client
  }

  input CreateClient {
    name: String!
    email: String!
  }
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String
  }
  type OccupyTableMutationResponde implements MutationResponse {
    code: String!
    success: Boolean!
    message: String
    table: Table!
    client: Client!
  }
  type Mutation {
    createTable(number: String!): Table!
    occupyTable(tableId: ID!, clientId: ID!): OccupyTableMutationResponde!
    login(email: String!): String
    createClient(client: CreateClient): Client
  }

  type Subscription {
    newClientOnTable: Client
  }
`;

module.exports = typeDefs;
