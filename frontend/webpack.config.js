var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: './src/index',

    output: {
        path: path.resolve('./dst/'),
        filename: 'bundle.min.js',
        // path: path.resolve('../static/'),
        // filename: "[name]-[hash].js"

    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.less']
    },

    devtool: 'inline-source-map',

    devServer: {
        overlay: true,
        port: '3001',
        host: '0.0.0.0',
        proxy: {
            '/api': 'http://localhost:8000'
        }
    },

    plugins: [
        new BundleTracker({
            filename: '../webpack-stats.json'
        })
    ]
};