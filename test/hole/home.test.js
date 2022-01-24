/**
 * @description  首页 test
 * @author 刘小倩
 */


 const server = require('../server')
 const { A_COOKIE } = require('../testUserInfo')
 
 //存储动态 id
 let BLOG_ID = ''
 
 // 创建
 test('创建一条动态，应该成功', async () => {
     //定义测试内容
     const content = '单元测试自动创建的微博_'+Date.now()
     const image = '/xxx.png'

     //开始测试
     const res = await server
     .post('/api/hole/create')
     .send({
         content,
         image
     })
     .set('cookie',  A_COOKIE)
     expect(res.body.errno).toBe(0)
     expect(res.body.data.content).toBe(content)
     expect(res.body.data.image).toBe(image)

     //记录微博 id
     BLOG_ID = res.body.data.id
 })
 
 test('首页，加载第一页数据', async () => {
    const res = await server
                    .get(`/api/hole/loadMore/0`)
                    .set('cookie', A_COOKIE)  // 设置 cookie
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})