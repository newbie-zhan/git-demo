//0 引入用来发送请求的方法，一定要把路径补全
import{requst} from "../../request/request.js";
const db = wx.cloud.database()
const app = getApp()
Page({
  data:{
    list:[],
    tops:[],
    tops_count:[],
    top_high:[],
    top_low:[],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "浏览次数",
        isActive: false
      },
      {
        id: 2,
        value: "价格升序",
        isActive: false
      },
      {
        id: 3,
        value: "价格降序",
        isActive: false
      },
    ],

  },

  //页面开始加载，就会触发
  onLoad: function (options) {
    // //1.发送异步请求获取轮播图数据 优化的手段可以通过es6的promise来解决这个问题

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

  },

  // 标题点击事件 从子组件传递过来,四中查询的设计
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


  addCart(e){
    
    const {item} = e.currentTarget.dataset
    const i = app.globalData.carts.findIndex(v=>v._id==item._id)
    if(i>-1){
      //数量+1
      app.globalData.carts[i].num += 1
    }else{
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
  onPullDownRefresh(){
    this.getList(true)  //获取列表数据函数
  },

//上拉触底
  onReachBottom(){
    this.Page += 1
    this.getList(true)
  },

  redirectToDetail(event,x){
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.id,
    })
    console.log(event.currentTarget.id)
  },

  toDetail(e){
    const id = e.currentTarget.id //获取商品ID
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  },


  gotoPage1: function () {
     wx.navigateTo({
       url: '/pages/computer/computer', 
      })
  },
  gotoPage2: function () {
    wx.navigateTo({
      url: '/pages/phone/phone',
    })
  },
  gotoPage3: function () {
    wx.navigateTo({
      url: '/pages/watch/watch',
    })
  },
  gotoPage4: function () {
    wx.navigateTo({
      url: '/pages/pad/pad',
    })
  },

  getList(isInit){
    const PAGE = 30;
    wx.showLoading({
      title: '加载中',
    })
    db.collection('emall').skip(this.page * PAGE).limit(PAGE).get({
      success:res=>{
        console.log('main',res.data)

        if(isInit) {
          this.setData({
            list:res.data
          })

        } else{
          //下拉刷新，不能直接覆盖而是累加
          this.setData({
            list:this.data.list.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }

        wx.hideLoading()
      }
    })



//////////////////////////////
    db.collection('computer').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('computer', res.data)

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



/////////////////////////////////////////
    db.collection('watch').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('watch', res.data)

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




//////////////////////////////////
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



///////////////////////////////////
    db.collection('phone').skip(this.page * PAGE).limit(PAGE).get({
      success: res => {
        console.log('phone', res.data)

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

  onShareAppMessage(){
    return{
      title:'你好，这里是随时淘商城'
    }
  },


  onLoad(){
    this.page = 0
    this.getList(true)
    this.getTop()
    this.getCount()
    this.getHigh()
    this.getLow()
    wx.showShareMenu()

  },

  getTop(){
    db.collection('emall').orderBy('count','desc').limit(9).get({
      success:res=>{
        console.log('lunbo',res.data)
        this.setData({
          tops:res.data
        })
      }
    })
  },


  getCount() {
    db.collection('emall').orderBy('count', 'desc').limit(25).get({
      success: res => {
        console.log('count', res.data)
        this.setData({
          tops_count: res.data
        })
      }
    })
  },

  getHigh() {
    db.collection('emall').orderBy('price', 'asc').limit(25).get({
      success: res => {
        console.log('Hing_price', res.data)
        this.setData({
          tops_high: res.data
        })
      }
    })
  },

  getLow() {
    db.collection('emall').orderBy('price', 'desc').limit(25).get({
      success: res => {
        console.log('Low_price', res.data)
        this.setData({
          tops_low: res.data
        })
      }
    })
  },




  addMall(){
    //新增图片
    wx.chooseImage({
      count:1,

      success: function(res) {

        const filePath = res.tempFilePaths[0]
        const tempFile = filePath.split('.')
        const cloudPath = 'my-img-' + tempFile[tempFile.length-2]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success:res=>{
            console.log(res.fileID)
            // //新增
            db.collection('emall').add({
              data: {
                title: 'iphone 11 pro max ' ,
                price: 10899,
                tags: ['手机', '苹果'],
                classid:2,
          
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

  // 添加电脑
  addComputer(){
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
            db.collection('computer').add({
              data: {
                title: '苹果台式电脑 ',
                price: 20999,
                tags: ['电脑', '苹果'],
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

  // 添加手表
  addWatch(){
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
            db.collection('watch').add({
              data: {
                title: '三星 Gear S3 ',
                price: 2489,
                tags: ['手表', '三星'],
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

  //添加平板
  addPad(){
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
            db.collection('pad').add({
              data: {
                title: '荣耀平板 ',
                price: 1399,
                tags: ['平板电脑', '荣耀'],
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

  //添加手机
  addPhone(){
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
            db.collection('phone').add({
              data: {
                title: '三星 S20 5G',
                price: 5896,
                tags: ['手机', '三星'],
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





