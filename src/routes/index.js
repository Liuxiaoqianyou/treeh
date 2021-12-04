const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  //异步读取模板文件
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    mag: 'xxxxxxx'
  })
})

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

router.get('/json', async (ctx, next) => {
  // const session = ctx.session
  // if (session.viewNum == null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++

  ctx.body = {
    title: 'koa2 json'
    // viewNum: session.viewNum
  }
})

//userName动态参数
router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'koa2 sdjson',
    userName
  }
})

module.exports = router
