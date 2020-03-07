const { PubSub } = require("apollo-server");

const pubsub = new PubSub();
const NEW_CLIENT_ON_TABLE = "NEW_CLIENT_ON_TABLE";

const Subscription = {
  newClientOnTable: {
    subscribe: () => pubsub.asyncIterator([NEW_CLIENT_ON_TABLE])
  }
};

module.exports = {
    Subscription,
    pubsub,
    NEW_CLIENT_ON_TABLE,
};

