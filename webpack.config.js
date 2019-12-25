const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = {
  entry: "./src/scripts/index.ts",
  output: {
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: "src/manifest.json" },
      { from: "src/robots.txt" },
      { from: "src/index.html" },
      { from: "src/images/", to: "images/" },
    ]),
    new MiniCssExtractPlugin(),
  ],

  resolve: {
    extensions: [".ts", ".js"],
  },

  mode: "production",
  devServer: {
    contentBase: "./dist",
  },
}

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "inline-source-map"
    config.watch = true
  }
  return config
}
