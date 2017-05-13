// pages/themesList/themesList.js
var app = getApp();
Page({
  data:{
    root: app.globalData.myPadagogyApi,
    themesList:[],
    nextPage: 1
  },
  onLoad:function(options){
    var that = this;
    wx.request({
      url: app.globalData.myPadagogyApi + 'keywordRest/queryAll',
      method: 'GET', 
      success: function(res){
        console.log(res.data);
        that.setData({
          themesList:res.data.list,
          nextPage: res.data.nextPage
        });
        console.log("nexpage")
        console.log(that.data.nexPage)
      },
      fail: function() {
        console.log("数据拉取失败")
      },
      complete: function() {
        // complete
      }
    })
  },
  onReachBottom: function (res) {
    // 页面上拉触底事件的处理函数
    var that = this;
    if (that.data.nextPage == 0) {
      console.log('没有了')
    } else {
      wx.request({
        url: app.globalData.myPadagogyApi + 'keywordRest/queryAll',
        data: {
          pageNum: that.data.nextPage
        },
        method: 'GET',
        success: function (res) {
          console.log("在这")
          console.log(res)
          that.data.themesList.push({
            keyId: -1,
            title: '第' + res.data.pageNum + '页'
          });
          for (var i = 0; i < res.data.list.length; i++) {
            that.data.themesList.push(res.data.list[i])
          }
          console.log("themesList")
          console.log(that.data.themesList)
          that.setData({
            nextPage: res.data.nextPage,
            themesList: that.data.themesList
          })
          console.log("下拉后")
          console.log(that.data.themesList)
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