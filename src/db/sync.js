/***
 * @description sequelize同步数据库
 * @author 刘小倩
 */
const seq = require('./seq')
require('./model/index')

//测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

//执行同步 force每次同步时把之前的表清空掉，然后重新建避免干扰
seq.sync({force: true}).then(() => {
    console.log('sync ok')
    process.exit()
})