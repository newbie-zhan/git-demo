// 引入用户集合构造函数
const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    // 接受客户端传递发请求参数
    const { username, email, role, state, password } = req.body;
    // 即将要修改的id
    const id = req.query.id;

    // res.send(body.password);
    let user = await User.findOne({ _id: id });
    // 将客户端密码与数据库中用户密码进行比对，返回一个Boolean值
    const isValid = await bcrypt.compare(password, user.password);

    // 密码比对成功
    if (isValid) {
        // res.send('success!');
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        })

        // 从定向到用户列表页面
        res.redirect('/admin/user');

    } else {
        // 密码不比对失败
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行密码修改', id: id }
        next(JSON.stringify(obj));
    }

    // res.send(user);
}