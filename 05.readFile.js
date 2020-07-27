//   // 1.通过模块的名字fs对模块进行引用

// // 2.通过模块内部的readFile读取文件内容

// 	// 如果文件读取出错err 是一个对象 包含错误信息
// 	// 如果文件读取正确 err是 null
// 	// doc 是文件读取的结果




const fs = require('fs');

fs.readFile('./01.helloworld.js', 'utf8', (err, doc) => {
    console.log(err);
    console.log(doc);
})