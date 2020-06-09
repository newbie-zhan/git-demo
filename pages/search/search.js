// pages/search/search.js
/* 
1 输入框绑定 值改变事件 input事件
  1 获取到输入框的值
  2 合法性判断 
  3 检验通过 把输入框的值 发送到后台
  4 返回的数据打印到页面上
2 防抖 （防止抖动） 定时器  节流 
  0 防抖 一般 输入框中 防止重复输入 重复发送请求
  1 节流 一般是用在页面下拉和上拉 
  1 定义全局的定时器id
 */
import { request } from "../../request/index.js";
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    goods: [],
    list: [],
    // 取消 按钮 是否显示
    isFocus: false,
    // 输入框的值
    inpValue: ""
  },
 
  // 输入框的值改变 就会触发的事件
  handleInput(e) {
    // 1 获取输入框的值
    const { value } = e.detail;
    // 2 检测合法性
    if (!value.trim()) {
      //去掉两边的空格
      this.setData({
        goods: [],
        isFocus: false
      })
      // 值不合法
      return;
    }else{
      var p = this.data.list;
      var List = [];
      for (var i = 0; i < p.length; i++) {
        if (p[i].title == value) {
          List.push(p[i])
        }
      }
      this.setData({
        isFocus: true,
        goods: List
      })      

    }

  },


  toDetail(e) {
    const id = e.currentTarget.id //获取商品ID
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },

  searchTab(e) {

    var p = this.data.list;
    var id = e.currentTarget.id;
    console.log(e);
    var List = []
    for (var i = 0; i < p.length; i++) {
      if (p[i].classid == id) {
        List.push(p[i])
      }
    }
    this.setData({
      productList: List
    })
  },
  

  // 点击 取消按钮
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  },
  getList(isInit) {
    const PAGE = 20;
    wx.showLoading({
      title: '加载中',
    })
    db.collection('emall').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('main', res.data)

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


  onLoad() {
    this.getList(true)
  },

})
