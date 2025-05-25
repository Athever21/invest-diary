import express, { Response } from 'express';
import dotenv from 'dotenv';

import expressPlayground from 'graphql-playground-middleware-express'
import { createYoga } from 'graphql-yoga';
import { schema } from "./graphql";
import { createContext } from "./graphql/context";
import { connectDB } from './config/database';
import { graphqlUploadExpress } from 'graphql-upload-ts';

(async() => await connectDB())();

dotenv.config()
const app = express();
const yoga = createYoga({ schema, context: createContext, maskedErrors: false });

app.get("/", (_, res: Response) => {
    res.send("Hello World! ");
});

app.use(graphqlUploadExpress({ maxFileSize: 5_000_000, maxFiles: 5}));
app.get("/playground", expressPlayground({ endpoint: '/graphql' }));
app.use(yoga.graphqlEndpoint, yoga);

const PORT = process.env.TRADES_NODE_DOCKER_PORT;
app.listen(PORT, () => console.log(`Server running at ${PORT}`))