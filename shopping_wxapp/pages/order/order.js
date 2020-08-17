// pages/order/order.js
const db = wx.cloud.database()
const app = getApp()
/* 
1 页面加载的时候
  1 从缓存中获取购物车数据 渲染到页面中
     
2 微信支付
  1 哪些人 哪些帐号 可以实现微信支付
    1 企业帐号 
    2 企业帐号的小程序后台中 必须 给开发者 添加上白名单 
      1 一个 appid 可以同时绑定多个开发者
      2 这些开发者就可以公用这个appid 和 它的开发权限  
3 支付按钮
  1 先判断缓存中有没有token
  2 没有 跳转到授权页面 进行获取token 
  3 有token 。。。
  4 创建订单 获取订单编号
  5 已经完成了微信支付
  6 手动删除缓存中 已经被选中了的商品 
  7 删除后的购物车数据 填充回缓存
  8 再跳转页面 
 */

// 在需要使用的js文件中，导入js ，引用获取电脑同步时间 
var util = require('../../utils/util.js'); 


Page({
  data: {
    carts: [],
    total: 0,
    len:0,
    address: {}, 
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

  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });
  }, 

  pay() {
    // //新增
    this.getTotal();
    this.setNum();
    db.collection('order').add({
      data: {
        username: this.data.address.userName,
        price: this.data.total,
        number:this.data.len,
        telnumber: this.data.address.telNumber,
        postalcode: this.data.address.postalCode,
        useraddress: this.data.address.provinceName + this.data.address.cityName + this.data.address.countyName + this.data.address.detailInfo, 
        time: this.data.time,
      },
      success: ret => {
        console.log("下单成功")
        wx.showModal({
          title: '下单提示:',
          content: '付款成功！',
        })
        // 3 跳转到 首页
        wx.navigateTo({
          url: '/pages/checkorder/checkorder'
        });
      },
      
    })
    


    // wx.showModal({
    //   title: '下单提示:',
    //   content: '付款成功！',
    // })
    // 8 手动删除缓存中 已经支付了的商品
    // let newCart = wx.getStorageSync("carts");
    // newCart = newCart.filter(v => !v.checked);
    // wx.setStorageSync("carts", newCart);
  },





  buy() {


    wx.showModal({
      title: '下单提示:',
      content: '付款成功！',
    })
    // 8 手动删除缓存中 已经支付了的商品
    let newCart = wx.getStorageSync("carts");
    newCart = newCart.filter(v => !v.checked);
    wx.setStorageSync("carts", newCart);    
  },

  getTotal() {
    const total = this.data.carts.reduce((sum, a) => sum + a.price * a.num, 0)
    this.setData({
      total
    })

  },

  setNum() {
    const len = this.data.carts.reduce((sum, a) => sum + a.num, 0)
    if (len > 0) {
      this.setData({
        len
      })
    }

  },


  // reduceCart(e) {
  //   const { index } = e.currentTarget.dataset
  //   const carts = [...this.data.carts]//复制数据
  //   carts[index].num -= 1
  //   this.setData({
  //     carts
  //   })

  //   // 4 判断是否要执行删除
  //   if (carts[index].num === 0) {
  //     carts.splice(index, 1);
  //     this.setData({
  //       carts
  //     })
  //   } else {
  //     this.setData({
  //       carts
  //     })
  //   }
  //   app.globalData.carts = carts //同步本地数据，
  //   app.setTabbar()  //修改全局数据
  //   this.getTotal()
  //   console.log(carts)
  // },

  // addCart(e) {
  //   const { index } = e.currentTarget.dataset
  //   const carts = [...this.data.carts]//复制数据
  //   carts[index].num += 1
  //   this.setData({
  //     carts
  //   })
  //   app.globalData.carts = carts //同步本地数据，
  //   app.setTabbar()  //修改全局数据
  //   this.getTotal()
  //   console.log(carts)
  // },
  onShow() {
    const address = wx.getStorageSync("address");
    this.setData({
      carts: app.globalData.carts,
      address
    })
    // 1 获取缓存中的收货地址信息
    
    this.getTotal()
    this.setNum()
  }

  
})