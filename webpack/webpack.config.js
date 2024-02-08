const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './javascripts/main.js',
    },
    devServer: {
        static: path.resolve(__dirname,'src'),
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader:'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.(css|sass|scss)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false, //コンソール上でSCSSを確認したいときにtrueにする
                        },
                    },
                    {
                        loader: 'sass-loader',//loaderは下から上に適応
                    },
                ],
            },
            {
                test: /\.(png|jpg)/,
                type: 'asset/resource',
                generator: {
                    filename:'images/[name][ext]',
                },
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         esModule: false,
                    //         name: 'images/[name].[ext]',
                    //     },
                    // },
                ],
            },
            {
                test: /\.pug/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/main.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.pug',
            inject: 'body',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/access.pug',
            inject: 'body',
            filename: 'access.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/members/taro.pug',
            inject: 'body',
            filename: 'members/taro.html',
        }),
        new CleanWebpackPlugin(),
    ],
}
