const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: "development",
  target: "node",
  entry: path.resolve(__dirname, "../server/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../build/server"),
    filename: "server.js",
  },
  externals: [nodeExternals({
    allowlist: ['react-datepicker/dist/react-datepicker.css']
  })],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
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
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
