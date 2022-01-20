/**
 * @description  动态 view 路由
 * @author 刘小倩
 */


 const router = require('koa-router')()
 const { loginRedirect } = require('../../middlewares/loginChecks')
 const { getProfileHoleList } = require('../../controller/hole-profile')
 const { getSquareBlogList } = require('../../controller/hole-square')


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
    // 已登录用户的信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
   const { userName: curUserName} = ctx.params
   const isMe = myUserName === curUserName
   if (isMe) {
       // 是当前登录用户
       curUserInfo = myUserInfo
   } else {
       // 不是当前登录用户
       const existResult = await isExist(curUserName)
       if (existResult.errno !== 0) {
           // 用户名不存在
           return
       }
       // 用户名存在
       curUserInfo = existResult.data
   }


   //获取动态第一页数据 
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
      },
      userData: {
         userInfo: curUserInfo,
         isMe
      }

   })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
   // 获取动态数据，第一页
   const result = await getSquareBlogList(0)
   const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

   await ctx.render('square', {
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
