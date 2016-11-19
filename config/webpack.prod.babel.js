import base from './webpack.base.babel';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import webpack from 'webpack';

export default (env) => merge(base(env), {
  entry: {
    js: './index.js',
    vendor: ['react', 'react-dom']
  },

  module: {
    rules: [
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

    // minifies the code
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  ]
})
