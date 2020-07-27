// const greeting = name => `hello ${name}`;
// const x = 100;
// exports.x = x;
// module.exports.greeting = greeting;
// // 当exports对象和moudle.exports对象指向的不是同一个对象时 以module.exports为准
// module.exports = {
// 	name: 'zhangsan'
// }

// exports = {
// 	age: 20
// }


const greeting = name => `hello everyone,I am ${name}`;
module.exports.greeting = greeting;