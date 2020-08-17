//pages/detail/detail.js

import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    item:{},
    top: [],
    list:[],
    productId:"",
    isCollect: false,
   

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  
  },


  onLoad() {
    this.page = 0
    
    this.getTop()

    wx.showShareMenu()

  },


  addCart(e) {
    // 将数据保存到本地方法
    wx.setStorageSync("id", this.data.productId)
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
    // wx.showToast({
    //   title: '添加到购物车成功！',
    // })
    // 窗口友好提示
    wx.showModal({
      title: '购物车提示',
      content: '产品添加到购物车成功！',
    })
  },


  addOrder(e) {
    // 将数据保存到本地方法
    wx.setStorageSync("id", this.data.productId)
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
    // wx.showToast({
    //   title: '添加到购物车成功！',
    // })
    // 窗口友好提示
    // wx.showModal({
    //   title: '购物车提示',
    //   content: '产品添加到购物车成功！',
    // })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { _id } = options;
    

  },


  getList(isInit) {
    const PAGE = 20
    wx.showLoading({
      title: '加载中',
    })
    db.collection('computer').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('xx', res.data)

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
    });


  },
  /////////////
  

  onShareAppMessage() {
    return {
      title: '你好，这里是随时淘商城'
    }
  },







  // order(){

  //   //统一下单
  //   wx.cloud.callFunction({
  //     name:'emall-pay', //云函数名字
  //     data:{
  //       type:'unifiedorder', //下单参数
  //       data:{
  //         goodId:this.data.id
  //       }
  //     },
  //     success:result=>{
  //       const data = result.data

  //       //再次签名
  //       wx.cloud.callFunction({
  //         name: 'emall-pay',
  //         data: {
  //           type: 'orderrequery',
  //           data: {
  //             out_trade_no: result.result.data.out_trade_no //单号
  //           }
  //         },
  //         success: queryRet => {

  //           const {
  //             time_stamp,
  //             nonce_str,
  //             sign,
  //             prepay_id,
  //             body,
  //             total_fee
  //           } = queryRet.result.data

  //           //拉起支付
  //           wx.requestPayment({
  //             timeStamp: 'time_stamp',
  //             nonceStr: 'nonce_str',
  //             package: 'prepay_id=${prepay_id}',
  //             signType: 'MD5',
  //             paySign: 'sign',
  //             success() {
  //               wx.hideLoading()
  //             }
  //           })
  //         },
  //       })  
          
  //     }
  //   })
  //   wx.showModal({
  //     title: '下单提示',
  //     content: '付款成功！',
  //   })
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    };

    this.setData({
      id: options.id
    });

  ////////////////////
    




    const ins = db.collection('emall').doc(options.id)
    ins.update({
      data:{
        count:db.command.inc(1)
      }   
     })
    ins.get({
      success:res=>{
        this.setData({
          item:res.data
        })
        // ins.update({
        //   data:{
        //     count: res.data.count+7782
        //   }
        // })
        console.log(res)
      }
    })



////////////////////////
    const ins1 = db.collection('computer').doc(options.id)
    ins1.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins1.get({
      success: res => {
        this.setData({
          item: res.data
        })
        // ins.update({
        //   data:{
        //     count: res.data.count+7782
        //   }
        // })
        console.log(res)
      }
    })


  /////////////////////////////
    const ins2 = db.collection('watch').doc(options.id)
    ins2.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins2.get({
      success: res => {
        this.setData({
          item: res.data
        })
        // ins.update({
        //   data:{
        //     count: res.data.count+7782
        //   }
        // })
        console.log(res)
      }
    })


  /////////////////////
    const ins3 = db.collection('pad').doc(options.id)
    ins3.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins3.get({
      success: res => {
        this.setData({
          item: res.data
        })
        // ins.update({
        //   data:{
        //     count: res.data.count+7782
        //   }
        // })
        console.log(res)
      }
    })

    /////////////////////
    const ins4 = db.collection('phone').doc(options.id)
    ins4.update({
      data: {
        count: db.command.inc(1)
      }
    })
    ins4.get({
      success: res => {
        this.setData({
          item: res.data
        })
        // ins.update({
        //   data:{
        //     count: res.data.count+7782
        //   }
        // })
        console.log(res)
      }
    })
    //console.log(options)


    


  },
  


  gotoPage1: function () {
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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