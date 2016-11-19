import base from './webpack.base.babel';
import merge from 'webpack-merge';
import webpack from 'webpack';

export default (env) => merge(base(env), {
  entry: {
    js: './index.js',
    vendor: ['react', 'react-dom']
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
