//app.js
App({
  onLaunch: function () {
    this.setTabbar()
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo){
      this.globalData.userInfo = userInfo
    }
    //小程序端初始化云开发
    wx.cloud.init()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
// 将添加到购物车的数据显示到底部导航栏购物车图标之上
setTabbar(){
  wx.setStorageSync('carts', this.globalData.carts)
  const len = this.globalData.carts.reduce((sum,a)=> sum+a.num,0)
  if(len>0){
    wx.setTabBarBadge({
      index: 2,
      text: len+'',
    })
  }

},
  hideTabBarRedDotByStorage(index, storageKey) {
    Storage.get('gameRecharged').then(res => {
      wx.hideTabBarRedDot({
        index: 3,
      })
    }, () => {
      wx.showTabBarRedDot({
        index: 3,
      })
    });
  },

  globalData: {
    userInfo: null,
    carts:wx.getStorageSync('carts') || [],
    
  }
})