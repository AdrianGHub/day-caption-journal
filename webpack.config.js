const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: './src/js/index.js',

    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].bundle.js',
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
                test: /\.sass|scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.jpg|png|svg|gif|jpeg$/i,
                loader: 'file-loader',
                options: {
                    name: '[name][hash:6].ext',
                    outputPath: 'assets/public/img' 
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
            filename: '[name]-[hash].css'
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets/public/img', to: 'assets/public/img' },
              { from: 'src/assets/public/icons', to: 'assets/public/icons' },
            ],
          }),
    ]
}