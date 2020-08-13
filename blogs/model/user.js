// 创建用户集合

// 引入mongoose第三方模块
const mongoose = require('mongoose');

// 导入bcrypt
const bcrypt = require('bcrypt');

// 引入Joi模块
const Joi = require('joi');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true,
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0,
    }

})

// 创建集合
const User = mongoose.model("User", userSchema);

async function createUse() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'zhan',
        email: 'zhan@163.com',
        password: pass,
        role: 'admin',
        state: 0,
    })
}

// createUse();

// 验证用户信息
const validateUser = user => {
    // 对象验证规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(20).required().error(new Error('用户名属性验证没有通过')),

        email: Joi.string().email().required().error(new Error('邮件地址属性验证不通过')),

        password: Joi.string().regex(/^[a-zA-Z0-9]{3,20}$/).required().error(new Error('密码属性验证不通过')),

        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色属性验证不通过')),

        state: Joi.number().valid(0, 1).required().error(new Error('状态属性验证不通过')),
    });

    // 实施验证
    return schema.validateAsync(user);



}




// 将用户集合作为模块成员进行导出
module.exports = {
    User,
    validateUser
}