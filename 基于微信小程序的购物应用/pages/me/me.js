const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    //motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    address: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.showShareMenu()
  },


  onShareAppMessage() {
    return {
      title: '你好，这里是随时淘商城'
    }
  },

  addCart(e) {

    const {
      item
    } = e.currentTarget.dataset
    const i = app.globalData.carts.findIndex(v => v._id == item._id)
    if (i > -1) {
      //数量+1
      app.globalData.carts[i].num += 1
    } else {
      item.num = 1
      app.globalData.carts.push(item)

    }
    app.setTabbar()
  },

  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];

    this.setData({ userinfo, collectNums: collect.length });

  },

  gotocollect: function () {
    wx.navigateTo({
      url: '/pages/feed/feed',
    })
  },



  getMall() {
    db.collection('emall').get({
      success: (res) => {
        console.log(res)
      }
    })
  },


  addMall() {
    //新增图片
    wx.chooseImage({
      count: 1,

      success: function(res) {

        const filePath = res.tempFilePaths[0]
        const tempFile = filePath.split('.')
        const cloudPath = 'my-img-' + tempFile[tempFile.length - 2]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log(res.fileID)
            // //新增
            db.collection('emall').add({
              data: {
                title: '苹果笔记本电脑',
                price: 12999,
                tags: ['电脑', '苹果'],
                image: res.fileID
              },
              success: ret => {
                console.log(ret)
                wx.showToast({
                  title: '新增成功！',
                })
              },
            })
            console.log(res)
          }
        })
      },
    })


    wx.showToast({
      title: '添加',
    })
  },





  order() {
    if (!this.data.address.userName) {
      wx.chooseAddress({
        success: res => {
          this.setData({
            address: res
          })
          console.log(res)
        }
      })
    } else {

    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})