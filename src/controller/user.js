/**
 * @description user controller
 * @author 刘小倩
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const { 
    registerUserNameNotExistInfo, 
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo
 } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')


/**
 * 用户名是否存在
 * @param {string} userName 用户名 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        //已存在   返回{errno: 0, data: {userInfo}}
        return  new SuccessModel(userInfo)
    } else {
        //不存在 返回{errno: 10003, message:'用户名不存在'}
        return new ErrorModel(registerUserNameNotExistInfo)
    }
    //统一返回格式
}


/**
 * 注册
 * @param {string } userName 用户名
 * @param {string } password 密码
 * @param {number } gender 性别（1男  2女   3保密）
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    //注册service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param {object} ctx  koa2 ctx
 * @param {string} userName 用户名 
 * @param {string} password  密码
 */
async function login(ctx, userName, password) {
    //登录成功 ctx.session.userInfo = 
    const userInfo= await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        //登录失败
        return new ErrorModel(loginFailInfo)
    }
    //登录成功
    if(ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName  用户名 
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        //成功
        return new SuccessModel()
    }
    //失败
    return new ErrorModel(deleteUserFailInfo)
}


/**
 * 
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
 async function changeInfo(ctx, {nickName, city, picture }) {
     const { userName} = ctx.session.userInfo
     if (!nickName) {
         nickName = userName
     }
     //service
     const result = await updateUser( 
         {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
         },
         { userName }
     )
     if (result) {
         //执行成功
         Object.assign(ctx.session.userInfo, {
             nickName,
             city,
             picture
         })
         //返回
         return new  SuccessModel()
     }
     //失败
     return new ErrorModel(changeInfoFailInfo)
}


module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo
}