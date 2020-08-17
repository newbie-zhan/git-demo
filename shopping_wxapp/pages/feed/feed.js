// pages/feed/feed.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    age: 0,
    gender: "",
    classify:"",
    suggestion: "",
  },

  getForm: function (e) {
    var formdata = e.detail.value;
    this.setData({
      "data.username": formdata.username,
      "data.age": formdata.age,
      "data.gender": formdata.gender,
      "data.classify": formdata.classify,
      "data.suggestion": formdata.suggestion,
    })
    console.log("更新data", e)
    //   wx.showToast({
    //   title: '信息已加载！',
    // })
   //窗口友好提示
  },
  getData: function (e) {
    var getdata = this.data;
    const db = wx.cloud.database();
    db.collection("feedback").add({
      data: {
        username: getdata.data.username,
        age: getdata.data.age,
        gender: getdata.data.gender,
        classify: getdata.data.classify,
        suggestion: getdata.data.suggestion,
      }
    }).then(res => {
      console.log("上传成功！", res)

    }).catch(res => {
      console.log("添加失败！！！", res)

    });
    wx.showToast({
      title: '你的意见已经提交，多谢你的宝贵建议！',
    }) 
    wx.navigateBack({
      delta: 1
    }); 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})