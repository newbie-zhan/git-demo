// 导入bcrypt
const bcrypt = require('bcrypt');


async function run() {
    // 生成随机字符串
    // genSalt方法接受一个数值作为参数
    // 数值越大，生成的随机数字符串复杂度越高
    // 数值越小，生成的随机数字符串复杂度越低
    // 默认数值为10
    // 返回一个随机生成字符串
    const salt = await bcrypt.genSalt(10);
    // 对密码进行加密
    // 1.要进行加密的明文
    // 2.随机字符串
    // 返回的是加密后的密码
    const result = await bcrypt.hash('123456', salt);
    console.log(salt);
    console.log(result);

}