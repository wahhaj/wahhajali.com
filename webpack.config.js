/* eslint-env node */
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 }},
          'postcss-loader'
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'src/manifest.json' },
      { from: 'src/robots.txt' },
      { from: 'src/index.html' },
      { from: 'src/images/', to: 'images/' }
    ]),
  ],

  mode: 'production',
  devServer: {
    contentBase: './dist',
  },
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
  }
  return config
}
