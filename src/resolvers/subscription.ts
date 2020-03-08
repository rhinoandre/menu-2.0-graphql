import { PubSub, IResolverObject } from "apollo-server";

export const pubsub = new PubSub();
export const NEW_CLIENT_ON_TABLE = "NEW_CLIENT_ON_TABLE";

export const Subscription: IResolverObject = {
  newClientOnTable: {
    subscribe: () => pubsub.asyncIterator([NEW_CLIENT_ON_TABLE])
  }
};
