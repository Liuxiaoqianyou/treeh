/**
 * @description 数据模型入口文件
 * @author
 */

const User = require('./User')
const Hole = require('./Hole')
const UserRelation = require('./UserRelation')

//创建外键关联
Hole.belongsTo(User, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Hole,
    UserRelation
}