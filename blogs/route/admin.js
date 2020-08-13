// 引用express框架
const express = require('express');
// 创建博客展示页路由
const admin = express.Router();



//  告诉express框架模板所在位置
// applicationCache.OBSOLETE('')


// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现用户登录功能
admin.post('/login', require('./admin/login'));


// 渲染平台用户注册页面
admin.get('/register', require('./admin/registerPage'));



// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 实现管理端退出功能
admin.get('/logout', require('./admin/logout'));

// 实现客户端退出功能
admin.get('/logoutuser', require('./admin/logoutuser'));

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

// 创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 创建实现用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));

// 创建实现文章修改功能路由
admin.post('/article-modify', require('./admin/article-modify'));

// 删除用户功能路由
admin.get('/delete', require('./admin/user-delete'));

// 删除文章功能路由
admin.get('/deletea', require('./admin/article-delete'));

// 文章列表路由
admin.get('/article', require('./admin/article'));

// 文章编辑路由
admin.get('/article-edit', require('./admin/article-edit'));

//实现文章添加功能路由
admin.post('/article-add', require('./admin/article-add'));





// 将路由对象作为模块成员进行导出
module.exports = admin;