/**
 * @description jest server
 * @author 刘小倩
 */



const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)