const { resolve } = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = {}) => ({
    devtool: env.prod ? 'source-map' : 'inline-source-map',
    entry: { 
        index: resolve(__dirname, './src/index.ts'),
        polyfills: resolve(__dirname, './src/polyfills.ts'),
        app: glob.sync('./src/app/**/*.ts').map(path => resolve(__dirname, path)),
        styles: resolve(__dirname, './src/styles.css')
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: env.prod ? '[name].bundle.[hash].js' : '[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            {
              test: /\.css$/,
              loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: resolve(__dirname, 'src', 'index.html')}),
        new CopyWebpackPlugin([]),
        new ExtractTextPlugin(env.prod ? 'styles.[hash].css' : 'styles.css'),
    ],
    devServer: {
        port: 3000,
    }
});