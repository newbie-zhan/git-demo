const guard = (req, res, next) => {
    //判断用户访问的是否为登录页面
    // 判断用户的登录状态
    // 如果用户是登录的，将请求放行
    // 如果用户不是登录状态，将请求从定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 如果用户的登录状态是普通用户，就让跳转到博客首页，并且不然控制器向下传递
        if (req.session.role == 'normal') {
            return res.redirect('/home/');
        }
        next();
    }
}

module.exports = guard;