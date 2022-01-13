/**
 * @description 个人主页 API 路由
 * @author 刘小倩
 */


 const router = require('koa-router')()
 const { loginCheck } = require('../../middlewares/loginChecks')
 const { getProfileHoleList } = require('../../controller/hole-profile')
 const { getBlogListStr } = require('../../utils/hole')

  //前缀
  router.prefix('/api/profile')


 //加载更多
 router.get('/loadMore/:userName/:pageIndex',loginCheck,async(ctx, next) => {
     let { userName, pageIndex} = ctx.params
     pageIndex = parseInt(pageIndex)
     const result = await getProfileHoleList(userName, pageIndex)
     //渲染为html字符串
     result.data.blogListTpl =  getBlogListStr(result.data.blogList)
     ctx.body = result
  
})

  module.exports = router