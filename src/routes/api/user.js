/**
 * @description user API路由
 * @author 刘小倩
 */

 const router = require('koa-router')()
 const { isExist } = require('../../controller/user')

 //前缀
 router.prefix('/api/user')

 //注册路由
 router.post('/register', async(ctx, next) => {

 })
 //用户名是否存在
 router.post('/isExist', async(ctx, next) => {
     const { userName } = ctx.request.body
    //controller
    ctx.body = await isExist(userName)
    
 })



 module.exports = router