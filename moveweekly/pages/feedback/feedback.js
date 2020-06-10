// pages/feedback/feedback.js

const app = getApp()
Page({

  /**    * 页面的初始数据
   */
  data: {
    username: "",
    age: 0,
    gender: "",
    suggestion:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  getForm: function(e) {
    var formdata = e.detail.value;
    this.setData({
      "data.username": formdata.username,
      "data.age": formdata.age,
      "data.gender": formdata.gender,
      "data.suggestion": formdata.suggestion,
    })
    console.log("更新data", e)

  },

  getData: function(e) {
    var getdata = this.data;
    const db = wx.cloud.database();
    db.collection("feedback").add({
      data: {
        username: getdata.data.username,
        age: getdata.data.age,
        gender: getdata.data.gender,
        suggestion: getdata.data.suggestion,
      }
    }).then(res => {
      console.log("添加至数据库成功", res)

    }).catch(res => {
      console.log("添加失败", res)

    })
  }
})