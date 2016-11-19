import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default (env) => ({
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  context: resolve(__dirname, '../src'),

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    // bundle HTML page
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    // need this to remove the dev-only bundled js
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
  ]
})
