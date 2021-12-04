const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')
const {isProd} = require('./utils/env')

//路由
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// error handler 页面出错信息  线上环境跳转到错误页
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
//解析post数据的
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
//ejx后端编译的模板，需要在这里注册一下
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//session配置
//加密
app.keys = ['DSDffew@#$9000']
//生成中间件给koa引用
app.use(session({
  key:'treehole.sid', //cookie name 默认是 'koa.sid'
  prefix: 'treehole:sess:', //redis key 的前缀，默认是 'koa:sess:'
  cookie: {
    path: '/', //生成的cookie在所有目录下都能访问
    httpOnly: true, //只能通过服务端去改cookie。客户端无权修改
    maxAge: 24 * 60 * 60 * 1000  // ms 过期时间一天
  },
  store: redisStore({//存储到redis中
    //127.0.0.1:6379
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //404的路由放在最下面

// error-handling 控制台打印 
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
