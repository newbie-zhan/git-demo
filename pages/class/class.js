// pages/class/class.js
const db = wx.cloud.database()
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    computerlist: [],
    phonelist: [],
    watchlist: [],
    padlist: [],
    // 分类的变量
    classType: [
      {
        "id": 1,
        "name": "电脑",
      },
      {
        "id": 2,
        "name": "手机",
      },
      {
        "id": 3,
        "name": "手表",
      },
      {
        "id": 4,
        "name": "平板",
      },
      {
        "id": 5,
        "name": "衣服",
      },
      {
        "id": 6,
        "name": "饰品",
      },
      {
        "id": 8,
        "name": "鞋子",
      },
      {
        "id": 9,
        "name": "箱包",
      },
      {
        "id": 10,
        "name": "饮料",
      },
      {
        "id": 11,
        "name": "家电",
      },
      {
        "id": 12,
        "name": "文具",
      },
      {
        "id": 13,
        "name": "图书",
      },

    ],
    //分类后的产品列表
    productList: [],
    //初始化数据
    //=list

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },





  // //下拉刷新，从新获取数据
  // onPullDownRefresh() {
  //   this.getList(true)  //获取列表数据函数
  // },

  // //上拉触底
  // onReachBottom() {
  //   this.Page += 1
  //   this.getList(true)
  // },

  // redirectToDetail(event, x) {
  //   wx.navigateTo({
  //     url: '/pages/detail/detail?id=' + event.currentTarget.id,
  //   })
  //   console.log(event.currentTarget.id)
  // },

  toDetail(e) {
    const id = e.currentTarget.id //获取商品ID
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },
  searchTab(e){
    
    var p = this.data.list;
    var id =e.currentTarget.id;
    console.log(e);
    var List = []
    for(var i=0 ;i < p.length;i++){
      if(p[i].classid == id){
        List.push(p[i])
      }
    }
    this.setData({
      productList:List
    })
  },


  gotoPage: function () {
    wx.navigateTo({
      url: '/pages/fenye/fenye',
    })
  },

  getList(isInit) {
    const PAGE = 28
    wx.showLoading({
      title: '加载中',
    })
    db.collection('emall').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('所有商品', res.data)

        if (isInit) {
          this.setData({
            list: res.data
          })

        } else {
          //下拉刷新，不能直接覆盖而是累加
          // this.setData({
          //   list: this.data.list.concat(res.data)
          //})
          wx.stopPullDownRefresh()
        }

        wx.hideLoading()
      }
    })



    ////////////////////////////////
    // db.collection('computer').skip(this.page * PAGE).limit(PAGE).get({
    //   success: res => {
    //     console.log('computer', res.data)

    //     if (isInit) {
    //       this.setData({
    //         computerlist: res.data
    //       })

    //     } else {
    //       //下拉刷新，不能直接覆盖而是累加
    //       this.setData({
    //         computerlist: this.data.computerlist.concat(res.data)
    //       })
    //       wx.stopPullDownRefresh()
    //     }

    //     wx.hideLoading()
    //   }
    // })



    // /////////////////////////////////////////
    // db.collection('watch').skip(this.page * PAGE).limit(PAGE).get({
    //   success: res => {
    //     console.log('watch', res.data)

    //     if (isInit) {
    //       this.setData({
    //         watchlist: res.data
    //       })

    //     } else {
    //       //下拉刷新，不能直接覆盖而是累加
    //       this.setData({
    //         watchlist: this.data.watchlist.concat(res.data)
    //       })
    //       wx.stopPullDownRefresh()
    //     }

    //     wx.hideLoading()
    //   }
    // })




    // //////////////////////////////////
    // db.collection('pad').skip(this.page * PAGE).limit(PAGE).get({
    //   success: res => {
    //     console.log('pad', res.data)

    //     if (isInit) {
    //       this.setData({
    //         padlist: res.data
    //       })

    //     } else {
    //       //下拉刷新，不能直接覆盖而是累加
    //       this.setData({
    //         padlist: this.data.padlist.concat(res.data)
    //       })
    //       wx.stopPullDownRefresh()
    //     }

    //     wx.hideLoading()
    //   }
    // })



    // ///////////////////////////////////
    // db.collection('phone').skip(this.page * PAGE).limit(PAGE).get({
    //   success: res => {
    //     console.log('phone', res.data)

    //     if (isInit) {
    //       this.setData({
    //         phonelist: res.data
    //       })

    //     } else {
    //       //下拉刷新，不能直接覆盖而是累加
    //       this.setData({
    //         phonelist: this.data.phonelist.concat(res.data)
    //       })
    //       wx.stopPullDownRefresh()
    //     }

    //     wx.hideLoading()
    //   }
    // })


  },

  onShareAppMessage() {
    return {
      title: '你好，这里是随时淘商城'
    }
  },


  onLoad() {
    this.page = 0
    this.getList(true)
    

    wx.showShareMenu()

  },

  // getTop() {
  //   db.collection('emall').orderBy('count', 'desc').limit(5).get({
  //     success: res => {
  //       console.log('lunbo', res.data)
  //       this.setData({
  //         tops: res.data
  //       })
  //     }
  //   })
  // },
})