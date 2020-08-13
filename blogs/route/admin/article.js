const { Article } = require('../../model/article');

const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {

    // 接受客户端传递过来的页码(请求数据中的page)
    const page = req.query.page;

    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'article';

    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec向数据库发出查询请求
    // 查询所有文章数据  populate联合查询关联的那个属性，查出对应的作者信息
    // 此时的articles已经不是原来的数组了，已经变成了对象，在对象里有个records的属性存放了需要查看的数组
    let articles = await pagination(Article).find({}).page(page).size(4).display(3).populate('author').exec();
    // res.send(articles);

    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: articles
    });

}