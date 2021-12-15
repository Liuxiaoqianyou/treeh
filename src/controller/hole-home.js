/**
 * @description 首页 controller
 * @author 刘小倩
 */


//做过滤
const xss = require('xss')
const{ createHole } = require('../services/hole')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
 * 创建动态
 * @param {Object} param0  创建动态所需的数据
 */
 async function create ({userId, content, image}) {
  try {
     const hole = await createHole({
        userId,
        content: xss(content),
        image
     }) 
     return new SuccessModel(hole)
  } catch (ex) {
      console.error(ex.message, ex.stack)
      return new  ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
    create
}