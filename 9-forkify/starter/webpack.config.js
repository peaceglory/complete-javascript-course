const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebPlugin({
            filename: 'index1.html',
            template: './src/index1.html'
        })
    ]/*,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }*/
};