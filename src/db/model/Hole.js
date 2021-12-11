/**
 * @description 树洞数据模型
 * @author 刘小倩
 */

 const seq = require('../seq')
 const { INTEGER, STRING, TEXT} = require('../types')

 const Hole = seq.define('hole', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '内容'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
 });

 module.exports = Hole