let jieba = require('nodejieba')

const len = 3 // 个数

jieba.load({
    userDict: '../user.utf8'
})

console.log(jieba.tag('恒大'))
console.log(jieba.extract('湖州恒大翡翠华庭', len))

console.log(jieba.cut("湖州恒大大翡翠华庭哈哈鹅哈"))