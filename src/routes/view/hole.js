/**
 * @description  动态 view 路由
 * @author 刘小倩
 */


 const router = require('koa-router')()
 const { loginRedirect } = require('../../middlewares/loginChecks')


//首页
 router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
 })

 router.get('/release', loginRedirect, async (ctx, next) => {
   await ctx.render('release', {})
})

 module.exports = router
