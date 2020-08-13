// 引入mongoose模块
const mongoose = require('mongoose');

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: [true, '请输入文章标题！']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: ['true', '请传递作者'],
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null

    },
    content: {
        type: String
    }

});

// 根据规则创建集合,集合首字母要大写
const Article = mongoose.model('Article', articleSchema);

// 将集合作为模块成员进行导出
module.exports = {
    Article
}