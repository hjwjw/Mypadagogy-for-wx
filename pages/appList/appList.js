// pages/appList/appList.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    root: app.globalData.myPadagogyApi,
    typeName:'',
    typeId: 1,
    articleList:[],
    pageData: [],
    nextPage: 1,
    open: false,
    nav: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.myPadagogyApi + 'appItemRest/queryByType/' + options.typeId,
      method:'GET',
      async: false,
      success:function(res){
        console.log("res");
        console.log(res);
        that.setData({
          typeId: options.typeId,
          typeName: options.typeName,
          articleList:res.data.list,
          pageData:res.data,
          nextPage:res.data.nextPage
        });
        wx.setNavigationBarTitle({
          title: that.data.typeName
        })
      },
      fail: function () {
        console.log("数据拉取失败");
      }
    })
    wx.request({
      url: app.globalData.myPadagogyApi + 'appTypeRest/queryParentId',
      method: 'GET',
      data: {
        parentId: options.typeId
      },
      success: function (res) {
        console.log("res");
        console.log(res);
        that.setData({
          nav: res.data
        });
        console.log(that.data.nav);
      },
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.nextPage == 0) {
      console.log('没有了')
    } else {
      wx.request({
        url: app.globalData.myPadagogyApi + 'appItemRest/queryByType/' + that.data.typeId,
        data: {
          pageNum: that.data.nextPage,
          pageSize: that.data.pageData.pageSize
        },
        method: 'GET',
        success: function (res) {
          that.data.articleList.push({
            appId: -1,
            title: '第' + res.data.pageNum + '页'
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
        fail: function () {
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
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    this.setData({
      open: false
    });
  },
  toindex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: that.data.typeName, // 分享标题
      desc: 'MyPadagogy小程序版', // 分享描述
      path: 'pages/appList/appList' + that.data.typeId // 分享路径
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})