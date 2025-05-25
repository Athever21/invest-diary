import { GraphQLError } from "graphql";
import { rule } from "graphql-shield";

const isAuthenticated = rule({ cache: 'contextual'})((_, _args, ctx) => !!ctx.user);

export default isAuthenticated;