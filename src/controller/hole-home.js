/**
 * @description 首页 controller
 * @author 刘小倩
 */


//做过滤
const xss = require('xss')
const{ createHole, getFollowersHoleList } = require('../services/hole')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constant')

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

/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
 async function getHomeHoleList(userId, pageIndex = 0) {
    const result = await getFollowersHoleList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}


module.exports = {
    create,
    getHomeHoleList  
}