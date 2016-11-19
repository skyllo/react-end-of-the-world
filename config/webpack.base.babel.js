import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default {
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
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [{
            loader: "css-loader", query: { modules: true }},
            'postcss-loader',
            'sass-loader'
          ]
        }),
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    // bundle HTML page
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    // extract css
    new ExtractTextPlugin("styles.css"),

    // configure options for loaders
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
        sassLoader: {
          includePaths: [resolve(__dirname, '../src', 'scss')]
        },
        context: '/'
      }
    }),
  ]
}
