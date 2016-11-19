import base from './webpack.base.babel';
import merge from 'webpack-merge';
import webpack from 'webpack';

export default (env) => merge(base(env), {
  entry: [

  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [''],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [

  ]
})
