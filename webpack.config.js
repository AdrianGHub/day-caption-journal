const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: './src/js/index.js',

    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[contenthash].bundle.js',
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/i,
                use: 'file-loader',
                options: {
                    name: '[name][contenthash:6].ext',
                    outputPath: 'assets/img' 
                }
            }

        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/content/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css'
        })
    ]
}