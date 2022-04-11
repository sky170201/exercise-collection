module.exports = {
    presets: [
        // 配置规则集
        "@babel/preset-env",
        // 解析vue模板中的jsx语法
        "@vue/babel-preset-jsx",
    ],
    plugins: ["@babel/plugin-transform-runtime"], // 按需引入polyfill
};
