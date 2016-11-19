import { resolve } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default (env) => ({
  entry: {
    js: './index.js',
    vendor: ['react', 'react-dom']
  },

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
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader"
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

    // assign modules and chunks shorter ids to lower file size
    new webpack.optimize.OccurrenceOrderPlugin(),

    // seperates out the vendor file into another chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),

    // extracts CSS from JS and puts into external file
    new ExtractTextPlugin("styles.css"),

    // sets the parameters of other loaders
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    // need this to remove the dev-only bundled js
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),

    // minifies the code
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  ]
})
