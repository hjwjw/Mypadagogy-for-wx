//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data:{
    root: app.globalData.myPadagogyApi,
    top_stories:[],
    articleList:[],
    pageData:[],
    nextPage:1,
    open: false,
    parentId:0,
    nav:[]
  },
  onLoad:function(options){
    var that = this;
    // 生命周期函数--监听页面加载
    wx.request({
      url: app.globalData.myPadagogyApi + 'appItemRest/queryAll',
      method: 'GET', 
      async:false,
      success: function(res){
        that.setData({
          pageData:res.data,
          nextPage: res.data.nextPage,
          articleList:res.data.list
          });
        for(var i=0;i< res.data.list.length;i++){
          if (res.data.list[i].img1 !=''){
            that.data.top_stories.push(res.data.list[i])
          }
        }
        that.setData({
          top_stories: that.data.top_stories
        })
      },
      fail: function() {
        console.log("数据拉取失败");
      }
    })

    wx.request({
      url: app.globalData.myPadagogyApi + 'appTypeRest/queryParentId',
      method:'GET',
      data:{
        parentId:that.data.parentId
      },
      success:function(res){
        console.log("res");
        console.log(res);
        that.setData({
          nav:res.data
        });
        console.log(that.data.nav);
      },
    })
  },
  onReachBottom: function(res) {
    // 页面上拉触底事件的处理函数
    var that =this;
    if(that.data.nextPage == 0 ){
      console.log('没有了')
    }else{
    wx.request({
      url: app.globalData.myPadagogyApi + 'appItemRest/queryAll',
      data:{
        pageNum: that.data.nextPage,
        pageSize: that.data.pageData.pageSize
      },
      method: 'GET',
      success: function(res){
        that.data.articleList.push({
          appId: -1,
          title: '第' + res.data.pageNum +'页'
        });
        for (var i = 0; i < res.data.list.length; i++) {
          that.data.articleList.push(res.data.list[i])
        }
        that.setData({
          pageData: res.data,
          nextPage: res.data.nextPage,
          articleList: that.data.articleList
        })
      },
      fail: function() {
        console.log("请求失败")
        // fail
      }
    })
    }
  },
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    this.setData({
      open: false
    });
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'MyPadagogy', // 分享标题
      desc: 'MyPadagogy小程序版', // 分享描述
      path: 'pages/index/index' // 分享路径
    }
  }
})
