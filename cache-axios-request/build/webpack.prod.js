const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 去重压缩css
const TerserPlugin = require("terser-webpack-plugin"); // 压缩JS代码
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 审查打包后的体积分布
const CompressionPlugin = require("compression-webpack-plugin"); // 开启Gzip压缩，需要后端配合
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(base, {
    mode: "production", // mode设置为production会自动开启tree-shaking优化
    devtool: "nosources-source-map", // 定位不到源码，但可以知道是第几行
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), // 去重压缩css
            new TerserPlugin({
                // 压缩JS代码
                terserOptions: {
                    compress: {
                        drop_console: true, // 生产环境去除console
                    },
                },
            }),
            // new BundleAnalyzerPlugin(),
            new CompressionPlugin({
                algorithm: "gzip",
                threshold: 602400, // 当资源大于10kb时打包成gzip, 单位字节
                minRatio: 0.8, // 压缩后的资源比
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new CleanWebpackPlugin(),
    ],
});
