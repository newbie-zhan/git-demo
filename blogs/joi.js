// 引入joi
const Joi = require('joi');

// 定义验证规则
const schema = Joi.object({
    username: Joi.string().min(2).max(20).required().error(new Error('username属性验证没有通过')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth属性验证没有通过')),

});



async function run() {
    try {
        // 实施验证
        await schema.validateAsync({ username: 'ab', birth: 1995 });
    } catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证通过')

}

run();