/**
 * @description 广场页 controller
 * @author 刘小倩
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/hole')

/**
 * 获取广场的动态列表
 * @param {number} pageIndex pageIndex
 */
async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const blogList = result.holeList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getSquareBlogList
}