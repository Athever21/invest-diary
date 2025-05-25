import { shield } from "graphql-shield";

import isAuthenticated from "./rules/isAuthenticated";

const permissions = shield({
    Query: {
        '*': isAuthenticated
    },
    Mutation: {
        '*': isAuthenticated
    }
}, { allowExternalErrors: true });

export default permissions;