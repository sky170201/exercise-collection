const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");

module.exports = merge(base, {
    mode: "development",
    devServer: {
        open: true,
    },
    devtool: "eval-cheap-module-source-map", // 能找到第几行，找不到第几列
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
            },
        }),
    ],
});
