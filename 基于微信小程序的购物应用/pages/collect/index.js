// pages/collect/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mycollect:[],
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        value: "品牌收藏",
        isActive: false
      },
      {
        id: 2,
        value: "店铺收藏",
        isActive: false
      },

    ]
  },

  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },


  reduceCollect(e) {
    const { index } = e.currentTarget.dataset
    const mycollect = [...this.data.mycollect]//复制数据
    mycollect[index].num -= 1
    this.setData({
      mycollect
    })
    app.globalData.mycollect = mycollect //同步本地数据，
    app.setTabbar()  //修改全局数据
    
  },

  addCollect(e) {
    const { index } = e.currentTarget.dataset
    const mycollect = [...this.data.mycollect]//复制数据
    mycollect[index].num += 1
    this.setData({
      mycollect
    })
    app.globalData.mycollect = mycollect //同步本地数据，
    app.setTabbar()  //修改全局数据
    
  },
  onShow() {
    this.setData({
      mycollect: app.globalData.mycollect
    })
    
  }

  // onShow() {
  //   const collect = wx.getStorageSync("collect") || [];
  //   this.setData({
  //     collect
  //   });

  // },


})