import Query from "./query";
import Mutation from "./mutation";
import { Subscription } from "./subscription";
import { IResolvers } from "apollo-server";

const resolvers: IResolvers = {
  Query,
  Mutation,
  Subscription
};

export default resolvers;
