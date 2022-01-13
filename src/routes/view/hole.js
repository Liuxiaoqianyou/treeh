/**
 * @description  动态 view 路由
 * @author 刘小倩
 */


 const router = require('koa-router')()
 const { loginRedirect } = require('../../middlewares/loginChecks')
 const { getProfileHoleList } = require('../../controller/hole-profile')


//首页
 router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
 })

 //个人主页
 router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
 router.get('/profile/:userName', loginRedirect, async (ctx, next) => {

   const { userName: curUserName} = ctx.params

   //获取微博第一页数据 
   //controller
   const result = await getProfileHoleList(curUserName, 0)
   const {isEmpty, blogList, pageSize, pageIndex, count} = result.data

   await ctx.render('profile', {
      blogData: {
         isEmpty,
         blogList,
         pageSize,
         pageIndex,
         count
      }
   })
})


 //发布页
 router.get('/release', loginRedirect, async (ctx, next) => {
   await ctx.render('release', {})
})

 module.exports = router
