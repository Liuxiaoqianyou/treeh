/**
 * @description  动态 service
 * @author 刘小倩
 */

 const { Hole } = require('../db/model/index')

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
 

 module.exports = {
    createHole
 }