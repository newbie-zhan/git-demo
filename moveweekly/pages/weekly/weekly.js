Page({
  data:
  {
    weeklyMovieList:[
    
      {
      name: "小丑",
      comment: "湿冷无望的哥谭市，卑微的亚瑟·弗兰克依靠扮演小丑赚取营生。",
      imagePath: "/images/002.jpg",
      isHighlyRecommended:false,
      //count:"8899887",
      //ss:"99",
        id: 27119724
     },
     
      {
        name: "蝙蝠侠：黑暗骑士 The Dark Knight (2008)",
        comment: "从亲眼目睹父母被人杀死的阴影中走出来的“蝙蝠侠”，经历了成长之后，已经不再是那个桀骜不的孤单英雄了。",
        imagePath: "/images/003.jpg",
        isHighlyRecommended: false,
        //count: "666655487",
       // ss: "88",
        id: 1851857
      },
      {
        name: "黑客帝国 The Matrix (1999)",
        comment: "不久的将来，网络黑客尼奥（基奴李维斯 饰）对这个看似正常的现实世界产生了怀疑。",
        imagePath: "/images/004.jpg",
        isHighlyRecommended: false,
       // count: "654122",
        //ss: "90",
        id: 1291843
      },
      {
        name: "阿凡达 Avatar (2009)",
        comment: "战斗中负伤而下身瘫痪的前海军战士杰克•萨利决定替死去的同胞哥哥来到潘多拉星操纵格蕾丝博士用人类基因与当地纳美部族基因结合创造出的 “阿凡达” 混血生物。",
        imagePath: "/images/005.jpg",
        isHighlyRecommended: true,
        //count: "1314520",
        //ss: "99.99",
        id: 1652587
      },

      {
        name: "教父",
        comment: "40年代的美国，“教父”维托·柯里昂（马龙·白兰度 饰）是黑手党柯里昂家族的首领，带领家族从事非法的勾当，但同时他也是许多弱小平民的保护神，深得人们爱戴。",
        imagePath: "/images/001.jpg",
        isHighlyRecommended: true,
        //count: "1314",
       // ss: "99.99",
        id: 1291841
      },
    ],
    mcount:0,
    
  },

  onLoad:function(options){ 
     //首先被调用完成整个页面的初始化操作，再依次调用下面的方法
     this.setData({
       currentIndex: this.data.weeklyMovieList.length - 1
     })
   },

   f0: function(event){
     this.setData({
       mcount:this.data.mcount + 1,

      // "weeklyMovieList[3].name":"***傻姑凉***"
     })
   },

  f1: function (event) {
    this.setData({
      currentIndex: this.data.weeklyMovieList.length - 1
    })
  },

  f2: function (event) {
   // console.log(event.currentTarget)
    var movieId = event.currentTarget.dataset.movieId
    console.log(movieId);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + movieId,
    })
  },

  onShareAppMessage:function(){
    return{
      title: "每周推荐:" 
    }
  },


   onShow:function(){
        //每一次页面状态从隐藏状态到显示都要调用
   },

   onReady:function(){
      //初始渲染完成,整个视图准备好可以交互时被调用一次
   },
   onHide:function(){
      //每一次页面被隐藏时就要调用一次
   },

   onUnload:function(){
    //
   },
})