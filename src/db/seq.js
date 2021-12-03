/**
 * @description sequelize实例
 * @author 刘小倩
  */

const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql'
}

//线上环境  使用连接池
// conf.pool = {
//     max: 5, //连接池中最大的连接数量
//     min: 0, // 最小
//     idle: 10000 // 如果一个连接池10s之内没有被使用则释放
// }

//生成一个Sequelize实例
const seq = new Sequelize('tree', 'root', '123456', conf)

module.exports = seq

//测试连接
// seq.authenticate().then( () => {
//     console.log("ok")
// }).catch( () => {
//     console.log("err");
// })