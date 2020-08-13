// 将评论集合构造函数导入
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    //接受客户端传递过来的请求参数
    const { content, uid, aid } = req.body;

    //将评论信息存储到评论结合中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });

    // 将页面重定向到文章详情页
    res.redirect('./article?id=' + aid);
}