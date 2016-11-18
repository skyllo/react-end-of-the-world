const {
  resolve
} = require('path');
const webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = env => {
  return {
    entry: {
      js: './index.js',
      vendor: ['react', 'react-dom']
    },
    output: {
      filename: '[name].bundle.js',
      //the output bundle

      path: resolve(__dirname, 'dist'),
    },

    context: resolve(__dirname, 'src'),

    module: {
      loaders: [{
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader"
        })
      }, ],
    },

    plugins: [

      new ExtractTextPlugin("styles.css"),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      // minifies your code
      new webpack.optimize.UglifyJsPlugin({
          minimize: true,
        compressor: {
          warnings: false,
        },
        comments: false

      })
    ],
  };
};
