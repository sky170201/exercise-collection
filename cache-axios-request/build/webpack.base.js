const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
// 将css拆分到独立的文件中
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

// webpack5默认开启热更新

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/chunk-[contenthash:8].js",
        clean: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
        extensions: [".js", ".vue", ".scss", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 指定编译的目录
                include: path.resolve(__dirname, "../src"),
                use: [
                    "cache-loader", // 缓存资源
                    "thread-loader", // 多进程打包
                    "babel-loader",
                ],
            },
            {
                test: /\.(css|s[cs]ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: [
                                // 放置全局引入的公共scss文件
                                path.resolve(
                                    __dirname,
                                    "../src/style/global.scss"
                                ),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                // 匹配文件后缀的规则
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: "asset",
                parser: {
                    // 转base64的条件，默认是8kb
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    },
                },
                generator: {
                    // 打包到dist/image文件下
                    filename: "image/[contenthash:8][ext][query]",
                },
            },
        ],
    },
    plugins: [
        new HtmlPlugin({
            template: "./public/index.html",
            filename: "index.html",
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: "css/chunk-[contenthash:8].css",
            ignoreOrder: true,
        }),
        new VueLoaderPlugin(),
        new ProgressBarPlugin({
            format: ` build [:bar] ${chalk.green.bold(
                ":percent"
            )} (:elapsed seconds)`,
        }),
    ],
};
