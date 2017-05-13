App({
    onLaunch: function () {
        var that = this;
        wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
                that.globalData.userInfo = res.userInfo;
                
            }
          })
        }
      })
    },
    onShow: function () {
        //console.log('App Show')
    },
    onHide: function () {
        //console.log('App Hide')
    },
    globalData: {
        zhihuApiUrl: "https://news-at.zhihu.com/api/",
        myPadagogyApi:"http://171y6504z5.iask.in/MyPadagogy/",
        userInfo:null,
        collect:[],
    }
})
