/**
 * @description  动态 service
 * @author 刘小倩
 */

 const { Hole, User } = require('../db/model/index')
 const { formatUser,formatHole } = require('./_format')

/**
 * 创建动态
 * @param {Object} param0  创建动态的数据 
 */
 async function createHole({userId, content, image}) {
    const result = await Hole.create({
        userId,
        content,
        image
    })
    return result.dataValues
  }
 
/**
 * 根据用户获取动态列表
 * @param {Object} param0  {userName, pageIndex = 0, pageSize = 10}
 */
async function getHoleListByUser({userName, pageIndex = 0, pageSize = 10}) {
   // 拼接查询条件
   const userWhereOpts = {}
   if (userName) {
       userWhereOpts.userName = userName
   }

   //执行查询
   const result = await Hole.findAndCountAll({
      limit: pageSize, // 每页多少条
      offset: pageSize * pageIndex, // 跳过多少条
      order: [
          ['id', 'desc']
      ],
      include: [
          {
              model: User,
              attributes: ['userName', 'nickName', 'picture'],
              where: userWhereOpts
          }
      ]
   })
   //result.count 总数，跟分页无关
   //result.rows 查询结果， 数组

   //获取dataValues
   let holeList = result.rows.map(row => row.dataValues)
   holeList = formatHole(holeList)
   holeList = holeList.map(holeItem => {
      const user = holeItem.user.dataValues
      holeItem.user = formatUser(user)
      return holeItem
   })
   return {
      count: result.count,
      holeList
   }
}

 module.exports = {
    createHole,
    getHoleListByUser
 }