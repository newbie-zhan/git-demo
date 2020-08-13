// 引入mongoose第三方模块
const mongoose = require('mongoose');

// 引入config模块
const config = require('config');
console.log(config.get('db.host'));

// 连接数据库
mongoose.connect(`mongodb://${config.get('db.host')}/${config.get('db.name')}`, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('数据库连接成功^__^'))
    .catch(() => console.log('数据库连接失败！！！'))