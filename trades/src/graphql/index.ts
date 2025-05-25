import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { createSchema } from "graphql-yoga";
import permissions from "./permissions";
import { applyMiddleware } from "graphql-middleware";
import { constraintDirective } from 'graphql-constraint-directive';

const typeDefs = mergeTypeDefs(loadFilesSync(`${__dirname}/schemas`));
const resolvers = mergeResolvers(loadFilesSync(`${__dirname}/resolvers`))

export const schema = applyMiddleware(
    constraintDirective()(createSchema({typeDefs, resolvers,})),
    permissions
);