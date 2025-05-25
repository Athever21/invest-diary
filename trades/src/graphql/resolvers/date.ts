import { GraphQLScalarType, Kind } from "graphql";

const date = new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Date scalar',
    parseValue: (value: any) => new Date(value),
    serialize: (value) => value instanceof Date ? value.toISOString() : null,
    parseLiteral: (ast) => ast.kind == Kind.STRING ? new Date(ast.value) : null
});

export default { Date: date };