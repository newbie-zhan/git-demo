// 引入用户集合构造函数
const { Article } = require('../../model/article');
// 引入第三方模块formidable
const formidable = require('formidable');
const path = require('path');

module.exports = async(req, res, next) => {
    // 接受客户端传递发请求参数
    const { title, publishDate, cover, content } = req.body;
    // 即将要修改的id
    const id = req.query.id;

    // res.send(body.password);


    if (id) {

        // 1.创建表单解析对象
        const form = new formidable.IncomingForm();
        //2. 配置上传文件的存放路径
        form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
        // 3.保留上传文件后缀名
        form.keepExtensions = true;
        // 4.解析表单
        form.parse(req, async(err, fields, files) => {
            // err错误对象，如果表单接失败，二人里面存放错误信息，解析成功则为null
            // filds 对象类型 保存普通表单数据
            // files 对象类型 baocunhe上床文件相关的数据
            // split截取字符串，将字符串按照截取字符发位置分隔存放在数组中
            // res.send(files.cover.path.split('public')[1]);
            await Article.updateOne({ _id: id }, {
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content
            });
        });
        // res.send('success!');
        // 将文章信息更新到数据库中

        // 从定向到用户列表页面
        res.redirect('/admin/article');

    } else {
        let obj = { path: '/admin/article-edit', message: '该文章不存在,无法进行修改', id: id }
        next(JSON.stringify(obj));
    }

    // res.send(user);
}