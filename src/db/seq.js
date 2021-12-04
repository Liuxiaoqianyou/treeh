/**
 * @description sequelize实例
 * @author 刘小倩
  */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')


const {host, user, password, port, database} = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

//如果是测试环境就不要打印sql语句
if(isTest){
  conf.logging = () => {}
}


//线上环境  使用连接池
if(isProd){
  conf.pool = {
    max: 5, //连接池中最大的连接数量
    min: 0, // 最小
    idle: 10000 // 如果一个连接池10s之内没有被使用则释放
}
}


//生成一个Sequelize实例
const seq = new Sequelize(database, user, password, conf)

module.exports = seq

//测试连接
// seq.authenticate().then( () => {
//     console.log("ok")
// }).catch( () => {
//     console.log("err");
// })