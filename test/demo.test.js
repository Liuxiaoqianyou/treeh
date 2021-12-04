/**
 * @description test demo
 * @author 刘小倩
 */

function sun(a, b) {
    return a + b
}

test('test demo1', () => {
  const res = sun(10, 20)
  expect(res).toBe(30)
})
