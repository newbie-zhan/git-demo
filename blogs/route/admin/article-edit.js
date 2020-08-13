const { Article } = require('../../model/article');

module.exports = async(req, res) => {

    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'article';

    // 通过对象解构获取验证信息，id
    const { message, id } = req.query;

    if (id) {
        // 修改操作
        let article = await Article.findOne({ _id: id });
        // 渲染文章编辑页面（修改）
        res.render('admin/article-edit', {
            message: message,
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    } else {
        // 添加操作
        res.render('admin/article-edit', {
            message: message,
            link: '/admin/article-edit',
            button: '添加'
        });
    }

    // res.render('admin/article-edit.art');
}