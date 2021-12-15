/**
 * @description  动态数据模型单元测试
 * @author 刘小倩
 */

 const { Hole } = require('../../src/db/model/index')

 test('U动态模型的各个属性，符合预期', () => {
    // build 会构建一个内存的 User 实例，但不会提交到数据库中
    const hole = Hole.build({
        userId: 1,
        content: '动态内容',
        image: '/test.png'
    })
    // 验证各个属性
    expect(hole.userId).toBe(1)
    expect(hole.content).toBe('动态内容')
    expect(hole.image).toBe('/test.png')
})
