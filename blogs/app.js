// 引用express框架
const express = require('express');
const path = require('path');

// 引入第三方模块body-parser，用来处理POST请求参数,只能处理普通数据类型，不能处理二进制数据类型
const bodyParser = require('body-parser');

// 引入express-session模块
const session = require('express-session');

// 引入第三方模板art-temlpate,在引入express-art-template的同时也包含了，所以可以直接引用
const template = require('art-template');

// 引入第三方模块dateformat
const dateFormat = require('dateformat');

// 引入morgan这个第三方模块,将客户端的请求信息打印到控制台，
const morgan = require('morgan');

// 引入config 运行环境配置信息抽离工具模块
const config = require('config');

// 创建网站服务器
const app = express();

// 数据库连接 
require('./model/connect');

// 处理POST请求参数
app.use(bodyParser.urlencoded({ extended: false }));

// 配置session   saveUninitialized: false是不保存未初始化的cookie
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    // cookie以毫秒为单位，保留最长时间
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 测试创建用户
// require('./model/user');

// 告诉express框架所在位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架默认的后缀名是什么
app.set('view engine', 'art');
// 当渲染后缀名为art时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dateformate变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 获取配置信息 config会自动对运行环境进行判断
console.log(config.get('title'));

// process对象 是global全局变量下的一个属性对象,可以直接调用
// 获取系统环境变量 返回值是一个对象
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log('当前是开发环境');
    // 在开发环境中，将客户端发送到到服务端的请求信息打印输出到控制台，包括请求地址，请求方式，响应信息等
    // 固定格式如下
    app.use(morgan('dev'));
} else {
    // 当前是生产环境
    console.log('当前是生产环境');
}

// 拦截用户请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
// const { template } = require('express-art-template');
// 为路由匹配请求地址
app.use('/home', home);
app.use('/admin', admin);

app.use((error, req, res, next) => {
    const result = JSON.parse(error);
    // { path: '/admin/user-edit', message: '密码比对失败，不能进行密码修改', id: id }
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})


// 监听端口
app.listen(3000);
console.log('~~~服务器开启成功,请访问localhost:3000 ~~~');