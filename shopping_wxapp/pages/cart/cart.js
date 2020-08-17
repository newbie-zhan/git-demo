const app = getApp()
/* 
1 获取用户的收货地址
  1 绑定点击事件
  2 调用小程序内置 api  获取用户的收货地址  wx.chooseAddress

  2 获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
    1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
      scope 值 true 直接调用 获取收货地址
    2 假设 用户 从来没有调用过 收货地址的api 
      scope undefined 直接调用 获取收货地址
    3 假设 用户 点击获取收货地址的提示框 取消   
      scope 值 false 
      1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候 
      2 获取收货地址
    4 把获取到的收货地址 存入到 本地存储中 
2 页面加载完毕
  0 onLoad  onShow 
  1 获取本地存储中的地址数据
  2 把数据 设置给data中的一个变量
3 onShow 
  0 回到了商品详情页面 第一次添加商品的时候 手动添加了属性
    1 num=1;
    2 checked=true;
  1 获取缓存中的购物车数组
  2 把购物车数据 填充到data中

5 总价格和总数量
  1 都需要商品被选中 我们才拿它来计算
  2 获取购物车数组
  3 遍历
  4 判断商品是否被选中
  5 总价格 += 商品的单价 * 商品的数量
  5 总数量 +=商品的数量
  6 把计算后的价格和数量 设置回data中即可 
8 商品数量的编辑
  1 "+" "-" 按钮 绑定同一个点击事件 区分的关键 自定义属性 
    1 “+” "+1"
    2 "-" "-1"
  2 传递被点击的商品id goods_id
  3 获取data中的购物车数组 来获取需要被修改的商品对象
  4 当 购物车的数量 =0 同时 用户 点击 "-"
    弹窗提示(showModal) 询问用户 是否要删除
    1 确定 直接执行删除
    2 取消  什么都不做 
  4 直接修改商品对象的数量 num
  5 把cart数组 重新设置回 缓存中 和data中 this.setCart
 
 */

import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    carts: [],
    total: 0,
    len: 0,
    address: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },




  buy() {
    wx.showModal({
      title: '下单提示:',
      content: '付款成功！',
    })
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
    wx.setStorageSync("len", len);
  },

  async gotoPage() {
    // 1 判断收货地址
    const {
      address,
      len
    } = this.data;
    if (!address.userName) {
      await showToast({
        title: "您还没有选择收货地址，请选择收货地址！"
      });
      return;
    }
    // 2 判断用户有没有选购商品
    if (len == 0) {
      await showToast({
        title: "您还没有选购商品，请添加商品"
      });
      return;
    }
    // 3 跳转到 下单页面
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },



  reduceCart(e) {
    const {
      index
    } = e.currentTarget.dataset
    const carts = [...this.data.carts] //复制数据
    carts[index].num -= 1
    this.setData({
      carts
    })

    //  判断是否要执行删除
    if (carts[index].num === 0) {
      carts.splice(index, 1);
      this.setData({
        carts
      })
    } else {
      this.setData({
        carts
      })
    }
    app.globalData.carts = carts //同步本地数据，
    app.setTabbar() //修改全局数据
    this.getTotal()
    console.log(carts)
  },


  order() {
    if (!this.data.address.userName) {
      wx.chooseAddress({
        success: res => {
          this.setData({
            address: res
          })
          console.log(res);

        }
      })
    } else {

    }
  },


  //收货地址
  choose() {
    // 1 获取 权限状态
    wx.getSetting({
      success: (result) => {
        //2 获取权限状态 主要发现一些属性名很怪异的时候 都要使用[]形式来获取属性值
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1);
            }
          });
        } else {
          //3 用户 以前拒绝过授权权限 先诱导用户打卡授权页面
          wx.openSetting({
            success: (result2) => {
              //4 可以调用收货地址代码
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3);

                }
              })
            }
          })
        }
      }
    })

  },




  // 点击 收货地址
  async chooseaddress() {
    try {
      // 1 获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      // 4 调用获取收货地址的 api
      let address = await chooseAddress();

      // 5 存入到缓存中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }

  },

  addCart(e) {
    const {
      index
    } = e.currentTarget.dataset
    const carts = [...this.data.carts] //复制数据
    carts[index].num += 1
    this.setData({
      carts
    })
    app.globalData.carts = carts //同步本地数据，
    app.setTabbar() //修改全局数据
    this.getTotal()
    console.log(carts)
  },
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