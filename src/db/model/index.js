/**
 * @description 数据模型入口文件
 * @author
 */

const User = require('./User')
const Hole = require('./Hole')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

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

Hole.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

Hole.hasMany(AtRelation, {
    foreignKey: 'holeId'
})

module.exports = {
    User,
    Hole,
    UserRelation,
    AtRelation
}