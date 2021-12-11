/**
 * @description 数据模型入口文件
 * @author
 */

const User = require('./User')
const Hole = require('./Hole')

//创建外键关联
Hole.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Hole
}