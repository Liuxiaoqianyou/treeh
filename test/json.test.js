/**
 * @description json test
 * @author 刘小倩
 */

const server = require('./server')

test('json接口返回数据格式正确', async () => {
  const res = await server.get('/json')
  //对象用toEqual，值用toBe
//   expect(res.body).toEqual({
//     title: 'koa2 json'
//   })
expect(res.body.title).toBe('koa2 json')
})
