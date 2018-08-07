const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    //入口文件
    entry: {
        app: [
            "react-hot-loader/patch",
            path.join(__dirname, "src/index.js"),
        ],
        vendor: ["react", "react-router-dom", "redux", "react-dom", "react-redux"]
    },


    //输出到dist文件夹，输出文件名字为bundle.js
    output: {
        path: path.join(__dirname, './dist'),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        //小于等于8K的图片会被转成base64编码，
                        // 直接插入HTML中，减少HTTP请求
                        limit: 8192
                    }
                }]
            }
        ]
    },

    resolve: {
        alias: {
            pages: path.join(__dirname, "src/pages"),
            component: path.join(__dirname, "src/component"),
            router: path.join(__dirname, "src/router"),
            actions: path.join(__dirname, "src/redux/actions"),
            reducers: path.join(__dirname, "src/redux/reducers"),
        }
    },

    devtool: "cheap-module-source-map",

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src/index.html")
        }),
        //提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),
        //文件压缩
        new UglifyJSPlugin(),
        //指定环境
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        //优化缓存
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new CleanWebpackPlugin(["dist"]),
        new ExtractTextPlugin({
            filename: "[name].[contenthash:5].css",
            allChunks: true,
        })
    ]
}