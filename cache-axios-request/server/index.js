const Koa = require('koa')
const cors = require('@koa/cors')

const app = new Koa()

app.use(cors())

app.use(async (ctx) => {
    let url = ctx.url
    console.log(url)
    if (url === '/home') {
        ctx.body = JSON.stringify({
            name: 'candy',
            age: 6
        })
    }
})

app.listen(9000, () => {
    console.log('server is running in port 9000!!!')
})