import { resolve } from 'path';
import webpack from 'webpack';

export default {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    context: resolve(__dirname, 'src'),

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        contentBase: '/dist',
        publicPath: '/'
    },

    module: {
        loaders: [
        { test: /\.js$/,
            loaders: [
            'babel-loader',
            ],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loaders: [
            'style-loader',
            'css-loader?modules',
            'postcss-loader',
            ],
        },
        ],
    },

    plugins: [
        // activates HMR
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),
    ]
};