import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default (env) => ({
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
            loader: "css-loader", query: { sourceMap: true, modules: true }},
            'sass-loader'
            ]
          }
        ),
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

    // need this to remove the dev-only bundled js
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),

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
})
