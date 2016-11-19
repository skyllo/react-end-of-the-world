import base from './webpack.base.babel';
import merge from 'webpack-merge';
import webpack from 'webpack';

export default (env) => merge(base(env), {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],

  devtool: 'source-map',

  devServer: {
    port: 3000,
    hot: true,
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
