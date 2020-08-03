// pages/checkorder/checkorder.js

const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [],
  },

  onLoad() {
    this.getOrder(true)
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getOrder(isInit) {
    const PAGE = 20;
    wx.showLoading({
      title: '加载中',
    })
    db.collection('order').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('order', res.data)

        if (isInit) {
          this.setData({
            order: res.data
          })

        } else {
          //下拉刷新，不能直接覆盖而是累加
          this.setData({
            order: this.data.order.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }

        wx.hideLoading()
      }
    })
  }


})