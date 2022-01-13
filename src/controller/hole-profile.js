/**
 * @description 个人主页 controller
 * @author 刘小倩
 */

const { getHoleListByUser } = require('../services/hole')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')

/**
 * 获取个人主页树洞列表
 * @param {string} userName 用户名
 * @param {number} pageIndex  当前页面
 */
async function getProfileHoleList(userName, pageIndex = 0) {
    // services
    const result = await getHoleListByUser({userName, pageIndex, pageSize:PAGE_SIZE })
    const blogList = result.holeList
    // console.log(blogList,1111)
    //拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length == 0 ,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count 
    })
} 

module.exports = {
    getProfileHoleList
}