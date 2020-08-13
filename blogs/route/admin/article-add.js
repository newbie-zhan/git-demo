// 引入第三方模块formidable
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');


module.exports = (req, res) => {
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
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });

        // 将文章重定向到文章列表页面
        res.redirect('/admin/article');

    })

}