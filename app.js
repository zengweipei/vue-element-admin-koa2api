const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticFiles = require('koa-static')

const router = require('./router/index')

const { baseUrl, port } = require('./config/url')

const { scheduleCronstyle } = require('./utils/timer')


const app = new Koa()

app.use(staticFiles(path.resolve(__dirname, "./public")))

app.use(bodyParser())

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.header.origin);
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild,token');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});


app.use(router.routes())
    .use(router.allowedMethods())


app.listen(port, () => {
    console.log(`starting at ${baseUrl}:${port}`)
})

scheduleCronstyle()
