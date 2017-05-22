// pages/user/user.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');

// 实例划API核心类
var qqMap = new QQMapWX({
  key: 'SW5BZ-DKFKU-4FWV2-2XH4U-XMGWZ-OYFGX' // 必填
});
var app = getApp();

Page({
  data: {
    root: app.globalData.myPadagogyApi,
    location:[],
    userInfo: [],
    weather:[],
    myCollect:[]
  },
  onLoad: function (options) {
    var that = this;
    var collect = wx.getStorageSync('selections')
    console.log('collect')
    console.log(collect)
    that.setData({
      userInfo: app.globalData.userInfo,
      myCollect:collect
    });
    
    // 调用腾讯地图接口
    qqMap.reverseGeocoder({
      success: function (res) {
        console.log("qqMap")
        console.log(res);
        that.setData({
          location:res.result
        });

          //  天气请求
        wx.request({
          url: 'https://v.juhe.cn/weather/index',
          data: {
            cityname:that.data.location.ad_info.city,
            key:'d281bfe2ba2d84f4e95febee07743f42'
          },
          method: 'GET', 
          success: function(res){
            that.setData({
              weather:res.data.result
            });
            console.log(that.data.weather)
          },
          fail: function() {
            // fail
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    // console.log("页面显示")
    var collect = wx.getStorageSync('selections')
    that.setData({
      userInfo: app.globalData.userInfo,
      myCollect:collect
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    console.log("页面关闭")
  }
})