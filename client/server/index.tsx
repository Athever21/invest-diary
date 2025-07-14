import express from "express";
import path from "path";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";
import { StaticRouter } from "react-router-dom";

const app = express();

// Serve static files
app.use("/static/", express.static(path.resolve(__dirname, "../client")));

if (process.env.NODE_ENV === 'development') {
    const webpackConfig = require('../webpack/webpack.client')

    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack({
        ...webpackConfig,
        stats: 'errors-only'
    })

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        serverSideRender: true,
        writeToDisk: true
    }))
    app.use(webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
    }))
}

// SSR endpoint
app.get("*", (req, res) => {
    const stream = renderToPipeableStream(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>, {
        onShellReady() {
            res.status(200).setHeader("Content-Type", "text/html");
            res.write(
                `<!DOCTYPE html><html><head><title>React 18 SSR</title></head><body><div id="root">`
            );
            stream.pipe(res);
        },
        onAllReady() {
            res.write("</div><script src=\"/static/client.js\"></script></body></html>");
            res.end();
        },
        onError(err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        },
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});