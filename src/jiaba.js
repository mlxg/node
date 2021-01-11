let jieba = require('nodejieba')


jieba.load({
    userDict:'../user.utf8'
})
var result = jieba.cut("湖州恒大翡翠华庭");
console.log(result);