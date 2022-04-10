const Koa = require("koa");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const mimes = {
    css: "text/css",
    less: "text/css",
    gif: "image/gif",
    html: "text/html",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    js: "text/javascript",
    json: "application/json",
    pdf: "application/pdf",
    png: "image/png",
    svg: "image/svg+xml",
    swf: "application/x-shockwave-flash",
    tiff: "image/tiff",
    txt: "text/plain",
    wav: "audio/x-wav",
    wma: "audio/x-ms-wma",
    wmv: "video/x-ms-wmv",
    xml: "text/xml",
};

// 根据访问的文件后缀，设置Content-type是什么类型
function parseMime(url) {
    let extName = path.extname(url);
    extName = extName ? extName.slice(1) : "unknown";
    return mimes[extName];
}

// 解析静态资源
function parseStatic(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

// 获取文件信息
function getFileStat(url) {
    return new Promise((resolve, reject) => {
        fs.stat(url, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const app = new Koa();

app.use(async (ctx) => {
    const url = ctx.url;
    if (url === "/") {
        // 访问根路径返回index.html
        ctx.set("Content-type", "text/html");
        ctx.body = await parseStatic("./index.html");
    } else {
        const filePath = path.resolve(__dirname, `.${url}`);
        // 设置类型
        ctx.set("Content-type", parseMime(url));

        // 设置E-tag/If-None-Match
        const fileBuffer = await parseStatic(filePath);
        const IfNoneMatch = ctx.request.header["if-none-match"];
        // 生产内容hash值
        const hash = crypto.createHash("md5");
        hash.update(fileBuffer);
        const etag = `"${hash.digest("hex")}"`;
        ctx.set("Cache-Control", "no-cache");
        ctx.set("Content-Type", parseMime(url));
        // 对比hash值
        if (IfNoneMatch === etag) {
            ctx.status = 304;
        } else {
            ctx.set("etag", etag);
            ctx.body = fileBuffer;
        }

        // 设置if-modified-since/last-modified
        // const ifModifiedSince = ctx.request.header["if-modified-since"];
        // const fileStat = await getFileStat(filePath);
        // console.log(filePath, ifModifiedSince, fileStat.mtime.toGMTString());
        // ctx.set("Cache-Control", "no-cache");
        // if (ifModifiedSince === fileStat.mtime.toGMTString()) {
        //     ctx.status = 304;
        // } else {
        //     ctx.set("Last-Modified", fileStat.mtime.toGMTString());
        //     ctx.body = await parseStatic(filePath);
        // }

        // 设置Expires响应头
        // const time = new Date(Date.now() + 10000).toUTCString();
        // ctx.set("Expires", time);

        // 设置 Cache-Control 响应头
        // ctx.set("Cache-Control", "max-age=10");

        // 设置传输
        // ctx.body = await parseStatic(filePath);
    }
});

app.listen(8080, () => {
    console.log("server is running");
});
