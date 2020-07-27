const fs = require('fs');
fs.writeFile('./demo1.txt', '要写入的内容', err => {
    if (err != null) {
        console.log(err);
        return;
    }
    console.log('写入成功！');
})