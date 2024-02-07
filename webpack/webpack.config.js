const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './javascripts/main.js',
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',//loaderは下から上に適応
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/my.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
}
