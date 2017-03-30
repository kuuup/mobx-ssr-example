/* flow */
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src/client'),
    entry: {
        app: './index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
          	        presets: [['es2015', { "modules": false }], 'stage-0', 'react'],
          	        plugins: ['transform-decorators-legacy']
                }
            }],
        }],
    }
};
