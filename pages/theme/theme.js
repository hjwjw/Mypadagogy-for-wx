// pages/theme/theme.js
var app = getApp();
Page({
  data:{
    root: app.globalData.myPadagogyApi,
    themes:null,
    stories:null,
    themeSwiper:[],
    pageData:[],
    appList:[],
    pageNum:1,
    keyId:null,
    isNull:false
  },
  onLoad:function(options){
    var that = this;
    that.setData({
      keyId: options.id
    })
    console.log(options.id)
    wx.request({
      url: app.globalData.myPadagogyApi + 'appItemRest/queryByKey/' + that.data.keyId,
      method: 'GET',
      success: function(res){
        console.log(res.data)
        var newStories=[];
        if (res.data.list.length == 0) {
          console.log("没有数据了")
          console.log(that.data.appList)
          that.setData({
            appList:that.data.appList,
            isNull: true
          })
          console.log("list is null");
        }else{
          that.setData({
            pageData: res.data,
            appList: res.data.list,
            pageNum: res.data.pageNum
          })
        }
        
        
      },
      fail: function() {
        // fail
      }
    })

    wx.request({
      url: app.globalData.myPadagogyApi + 'keywordRest/queryById/' + that.data.keyId,
      method:'GET',
      success:function(res){
        wx.setNavigationBarTitle({
          title: res.data.name
        })
      },
    })
  },
  onReachBottom: function (res) {
    // 页面上拉触底事件的处理函数
    var that = this;
    if (that.data.isNull) {
      console.log('没有了')
    } else {
      wx.request({
        url: app.globalData.myPadagogyApi + 'appItemRest/queryByKey/' + that.data.keyId,
        data: {
          pageNum: that.data.pageNum +1
        },
        method: 'GET',
        success: function (res) {
          if (res.data.list.length == 0) {
            console.log("没有数据了")
            console.log(that.data.appList)
            that.setData({
              appList: that.data.appList,
              isNull: true
            })
          }else{
            console.log("在这")
            console.log(res)
            that.data.appList.push({
              appId: -1,
              title: '第' + (that.data.pageNum + 1) + '页'
            });
            for (var i = 0; i < res.data.list.length; i++) {
              that.data.appList.push(res.data.list[i])
            }
            console.log("appList")
            console.log(that.data.appList)
            that.setData({
              pageData: res.data,
              pageNum: that.data.pageNum + 1,
              appList: that.data.appList
            })

            console.log("下拉后")
            console.log(that.data.appList)

          }
          
        },
        fail: function () {
          // fail
        }
      })

    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})