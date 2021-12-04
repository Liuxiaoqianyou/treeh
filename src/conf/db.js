/**
 * @description 存储配置
 * @author 刘小倩
 */

const {isProd} = require('../utils/env')

//redis连接配置
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

//mysql配置
let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'tree'
}

//线上配置
if(isProd){
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'tree'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}