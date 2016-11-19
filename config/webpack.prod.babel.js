import base from './webpack.base.babel';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import webpack from 'webpack';

export default merge(base, {
  entry: {
    js: './index.js',
    vendor: ['react', 'react-dom']
  },

  module: {
    rules: [
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
    // assign modules and chunks shorter ids to lower file size
    new webpack.optimize.OccurrenceOrderPlugin(),

    // seperates out the vendor file into another chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),

    // set build env to production
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // sets the parameters of other loaders
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    // minifies the code
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    }),

    // extract css
    new ExtractTextPlugin("styles.css")
  ]
})
