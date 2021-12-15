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

  //前缀
  router.prefix('/api/hole')


 //注册路由
 router.post('/create',loginCheck,genValidator(holeValidate), async(ctx, next) => {
    const { content, image} = ctx.request.body
    const { id: userId} = ctx.session.userInfo
    //controller，
    ctx.body = await create({userId, content, image})
})

  module.exports = router