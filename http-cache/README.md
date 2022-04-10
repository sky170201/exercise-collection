#### 项目介绍

> 通过 nodejs 简单实践 HTTP 缓存

#### HTTP 缓存种类

HTTP 缓存常见的有两类：

-   强缓存：可以由这两个字段其中一个决定

    -   expires
    -   cache-control(优先级更高)

-   协商缓存：可以由这两对字段中的一对决定

    -   Last-Modified，If-Modified-Since
    -   Etag，If-None-Match(优先级更高)

#### 技术栈

> koa + crypto
