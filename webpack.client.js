const path = require('path')

const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const config = {
  // Target environment for bundling
  target: 'web',

  name: 'client',
  mode: 'development',

  // Entry file location for client code bundling
  entry: [
    'webpack-hot-middleware/client',
    './src/client/client.js',
  ],

  output: {
    filename: 'client.js',
    path: path.resolve('public'),
    publicPath: '/',
  },

  devtool: 'source-map',

  stats: {
    colors: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // Set to false to speed up build time
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // Set to false to speed up build time
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
}

module.exports = config
