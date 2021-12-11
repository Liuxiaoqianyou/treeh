/**
 * @description utils api 路由
 * @author  刘小倩
 */


 const router = require('koa-router')()
 const { loginCheck } = require('../../middlewares/loginChecks')
 const koaForm = require("formidable-upload-koa");
 const { saveFile } = require('../../controller/utils')

  //前缀
  router.prefix('/api/utils')

   //上传图片路由
 router.post('/upload', loginCheck, koaForm(), async(ctx, next) => {
    const file = ctx.req.files['file']
    if (!file) { return }
    const {size, path, name, type } = file
    //controller
    ctx.body = await saveFile({
        name, 
        type, 
        size, 
        filePath : path
    })
})

module.exports = router