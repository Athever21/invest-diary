const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const refresh = require('react-refresh-typescript').default;

module.exports = {
    name: 'browse',
    mode: 'development',
    entry: [
        "webpack-hot-middleware/client",
        path.resolve(__dirname, "../../src/index.tsx")
    ],
    output: {
        path: path.resolve(__dirname, '../client'),
        publicPath: '/static/',
        clean: true,
        filename: 'client.js'
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            getCustomTransformers: () => ({
                                before: [refresh()]
                            }),
                            transpileOnly: true,
                        },
                    }, {
                        loader: 'react-refresh-loader'
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    optimization: {
        concatenateModules: false,
        mergeDuplicateChunks: true,
        flagIncludedChunks: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin({
            overlay: {
                sockIntegration: 'whm'
            }
        })
    ],
}