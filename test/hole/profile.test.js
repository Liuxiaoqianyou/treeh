/**
 * @description  个人主页test
 * @author 刘小倩
 */


 const server = require('../server')
 const { A_COOKIE, A_USER_NAME} = require('../testUserInfo')

 test('个人主页，加载第一页数据，应该成功', async () => {
     const res = await server
        .get(`/api/profile/loadMore/${A_USER_NAME}/0`)
        .set('cookie',  A_COOKIE)
    expect(res.body.errno).toBe(0)

    const data = res.body.data
    //验证是不是有这些属性
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')

 })
 