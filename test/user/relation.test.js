/**
 * @description 用户关系 单元测试
 * @author 刘小倩
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const {
    A_ID,
    A_USER_NAME,
    A_COOKIE,
    L_ID,
    L_USER_NAME
} = require('../testUserInfo')

// 先让aaa取消关注lxq（为了避免现在aaa关注了lxq）
test('无论如何，先取消关注', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: L_ID })
        .set('cookie', A_COOKIE)
    expect(1).toBe(1)
})

// 添加关注
test('aaa关注lxq，应该成功', async () => {
    const res = await server
        .post('/api/profile/follow')
        .send({ userId: L_ID })
        .set('cookie', A_COOKIE)
    expect(res.body.errno).toBe(0)
})

// 获取粉丝
test('获取lxq的粉丝，应该有aaa', async () => {
    const result = await getFans(L_ID)
    const { count, fansList } = result.data
    const hasUserName = fansList.some(fanInfo => {
        return fanInfo.userName === A_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// 获取关注人
test('获取aaa的关注人，应该有lxq', async () => {
    const result = await getFollowers(A_ID)
    const { count, followersList } = result.data
    const hasUserName = followersList.some(followerInfo => {
        return followerInfo.userName === L_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// 获取 at 列表
// test('获取张三的 at 列表，应该有李四', async () => {
//     const res = await server
//         .get('/api/user/getAtList')
//         .set('cookie', A_COOKIE)
//     const atList = res.body
//     const hasUserName = atList.some(item => {
//         // '昵称 - userName'
//         return item.indexOf(`- ${L_USER_NAME}`) > 0
//     })
//     expect(hasUserName).toBe(true)
// })

// 取消关注
test('aaa取消关注lxq，应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ userId: L_ID })
        .set('cookie', A_COOKIE)
    expect(res.body.errno).toBe(0)
})
