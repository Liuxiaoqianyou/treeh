/**
 * @description user controller
 * @author 刘小倩
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')

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

module.exports = {
    isExist
}