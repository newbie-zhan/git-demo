// pages/pad/pad.js
// pages/fenye/fenye.js
//0 引入用来发送请求的方法，硬顶要把路径补全
import { requst } from "../../request/request.js";
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    list: [],
    top: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //轮播图数组
    //swiperList: [],
    //导航数组
    //catesList: [],
  },

  //页面开始加载，就会触发
  onLoad: function (options) {
    //1.发送异步请求获取轮播图数据 优化的手段可以通过es6的promise来解决这个问题

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

    this.getSwiperList();

    this.getCateList();
  },



  addCart(e) {

    const { item } = e.currentTarget.dataset
    const i = app.globalData.carts.findIndex(v => v._id == item._id)
    if (i > -1) {
      //数量+1
      app.globalData.carts[i].num += 1
    } else {
      item.num = 1
      app.globalData.carts.push(item)

    }
    app.setTabbar()
    wx.showToast({
      title: '添加到购物车成功！',
    })
    // 窗口友好提示
  },

  //下拉刷新，从新获取数据
  onPullDownRefresh() {
    this.getList(true)  //获取列表数据函数
  },

  //上拉触底
  onReachBottom() {
    this.Page += 1
    this.getList(true)
  },

  redirectToDetail(event, x) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.id,
    })
    console.log(event.currentTarget.id)
  },

  toDetail(e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },

  getList(isInit) {
    const PAGE = 20
    wx.showLoading({
      title: '加载中',
    })
    db.collection('pad').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('pad', res.data)

        if (isInit) {
          this.setData({
            list: res.data
          })

        } else {
          //下拉刷新，不能直接覆盖而是累加
          this.setData({
            list: this.data.list.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }

        wx.hideLoading()
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '你好，这里是随时淘商城'
    }
  },


  onLoad() {
    this.page = 0
    this.getList(true)
    this.getTop()

    wx.showShareMenu()

  },

  getTop() {
    db.collection('emall').orderBy('count', 'desc').limit(5).get({
      success: res => {
        console.log(res.data)
        this.setData({
          tops: res.data
        })
      }
    })
  },

  addMall() {
    //新增图片
    wx.chooseImage({
      count: 1,

      success: function (res) {

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
                title: '下单测试02 ',
                price: 0.01,
                tags: ['电脑', '华为'],
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






})







