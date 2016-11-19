import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default {
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  context: resolve(__dirname, '../src'),

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    // bundle HTML page
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

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
