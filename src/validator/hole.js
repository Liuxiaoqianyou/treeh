/**
 * @description 动态 数据格式校验
 * @author 刘小倩
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}

/**
 * 校验动态数据格式
 * @param {Object} data 动态数据
 */
function holeValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = holeValidate
