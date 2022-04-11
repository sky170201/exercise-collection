##### 技术栈
- 前端
webpack5 + vue2 + axios + LRU缓存axios部分请求 + md5生成hash戳
- 后端
koa + @koa/cors


##### 在 vue2 原生脚手架模板中以下优化没有

-   new CssMinimizerPlugin()

    > 去重压缩 css

-   new BundleAnalyzerPlugin()

    > 分析打包体积分布

-   new CompressionPlugin()

    > 开启 gzip 压缩

##### vue2 原生脚手架模板中的 loader

-   针对 js 的
    -   cache-loader
    -   thread-loader
    -   babel-loader
-   针对 vue 的
    -   cache-loader
    -   vue-loader
-   针对图片/音频/字体资源的
    -   url-loader
    -   file-loader
-   针对 css 的
    -   (mini-css-extract-plugin).loader
    -   css-loader
    -   postcss-loader
    -   sass-loader/less-loader/stylus-loader

##### vue2 原生脚手架模板中的 optimization(优化)

-   splitChunks
    -   cacheGroups
    -   common
-   minimizer
    -   new TerserPlugin()

##### vue2 原生脚手架模板中的 plugins

-   new VueLoaderPlugin

    > .vue 文件模板解析

-   new DefinePlugin

    > 定义全局变量

-   new CaseSensitivePathsPlugin() /_ config.plugin('case-sensitive-paths') _/
-   new FriendlyErrorsWebpackPlugin /_ config.plugin('friendly-errors') _/
-   new MiniCssExtractPlugin /_ config.plugin('extract-css') _/

    > 拆分 css 文件

-   new OptimizeCssnanoPlugin /_ config.plugin('optimize-css') _/

-   new HashedModuleIdsPlugin

-   new NamedChunksPlugin
-   new HtmlWebpackPlugin /_ config.plugin('html') _/

    > index.html 入口 html 模板文件

-   new PreloadPlugin /_ config.plugin('preload') _/\_

    ```
    添加预加载的插件，script preload
    {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
            /\.map$/,
            /hot-update\.js$/
        ]
    }
    ```

-   new PreloadPlugin /_ config.plugin('prefetch') _/\_

    ```
    添加预解析的插件，script prefetch
    {
        rel: 'prefetch',
        	include: 'asyncChunks'
        }
    )
    ```

-   new CopyPlugin

    > 复制文件到打包目录中
