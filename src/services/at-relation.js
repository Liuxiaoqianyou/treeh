/**
 * @description 微博 @ 用户关系 service
 * @author 刘小倩
 */

const { AtRelation, Hole, User } = require('../db/model/index')
const { formatHole, formatUser } = require('./_format')

/**
 * 创建微博 @ 用户的关系
 * @param {number} holeId 动态 id
 * @param {number} userId 用户 id
 */
async function createAtRelation(holeId, userId) {
    const result = await AtRelation.create({
        holeId,
        userId
    })
    return result.dataValues
}

/**
 * 获取 @ 用户的动态数量（未读的）
 * @param {number} userId userId
 */
async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count
    // result.rows
}

/**
 * 获取 @ 用户的动态列表
 * @param {Object} param0 查询条件 { userId, pageIndex, pageSize = 10 }
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
    const result = await Hole.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            // @ 关系
            {
                model: AtRelation,
                attributes: ['userId', 'holeId'],
                where: { userId }
            },
            // User
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })
    // result.rows
    // result.count

    // 格式化
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatHole(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

/**
 * 更新 AtRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function updateAtRelation(
    { newIsRead }, // 要更新的内容
    { userId, isRead } // 条件
) {
    // 拼接更新内容
    const updateData = {}
    if (newIsRead) {
        updateData.isRead = newIsRead
    }

    // 拼接查询条件
    const whereData = {}
    if (userId) {
        whereData.userId = userId
    }
    if (isRead) {
        whereData.isRead = isRead
    }

    // 执行更新
    const result = await AtRelation.update(updateData, {
        where: whereData
    })
    return result[0] > 0
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}
