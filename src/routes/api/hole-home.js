/**
 * @description 首页API路由
 * @author 刘小倩
 */

 const router = require('koa-router')()
 const { loginCheck } = require('../../middlewares/loginChecks')
//  const koaForm = require("formidable-upload-koa");
//  const { saveFile } = require('../../controller/utils')
 const { create } = require('../../controller/hole-home')
 const { genValidator } = require('../../middlewares/validator')
 const holeValidate = require('../../validator/hole')
 const { getHomeHoleList } = require('../../controller/hole-home')
 const { getBlogListStr } = require('../../utils/hole')

  //前缀
  router.prefix('/api/hole')


 //注册路由
 router.post('/create',loginCheck,genValidator(holeValidate), async(ctx, next) => {
    const { content, image} = ctx.request.body
    const { id: userId} = ctx.session.userInfo
    //controller，
    ctx.body = await create({userId, content, image})
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)  // 转换 number 类型
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeHoleList(userId, pageIndex)
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})


  module.exports = router