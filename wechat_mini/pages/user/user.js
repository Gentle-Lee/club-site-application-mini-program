const app = getApp()
const phone = "";
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        phone: res.data
        console.log(res.data)
      },
      fail:function(res){
        wx.showToast({
          title: '请前往认证',
          image: "/res/icon_warn.png",
          duration: 2000
        })
      }
    })
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
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  JumpToAuthorization: function(){
    console.log('-------------click');
    wx.navigateTo({
      url: "authentication/authentication",
    })
  },
  JumpToApplication: function () {
    wx.navigateTo({
      url: "application/application",
    })
  },
  JumpToManagement: function () {
    wx.navigateTo({
      url: "management/management",
    })
  },
  JumpToCourse: function () {
    wx.navigateTo({
      url: "course/course",
    })
  }
})