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
`;

module.exports = typeDefs;