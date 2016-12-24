import base from './webpack.base.babel';
import merge from 'webpack-merge';
import webpack from 'webpack';

export default merge(base, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local].[hash:base64:5]&sourceMap&-minimize&importLoaders=2!postcss-loader!sass-loader?modules&outputStyle=expanded&sourceMap',
        exclude: /node_modules/
      }
    ]
  },

  performance: {
    hints: false
  },

  devServer: {
    port: 3000,
    hot: true,
    publicPath: '/',
    stats: 'errors-only'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
