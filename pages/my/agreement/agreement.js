// pages/my/agreement/agreement.js
const app = getApp();
var netapi = require("../../../utils/api.js");
var netWork = require("../../../utils/netWork.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuBotton: app.globalData.menuBotton,
        menuHeight: app.globalData.menuHeight,
        html: ""

  },
  //取消操作
cancal(){
  wx.switchTab({
    url: '/pages/index/index/index',
  })
},
//接受
goLogin() {
  wx.reLaunch({
      url: '/pages/my/login/login',
  })
},
//查看用户协议
getUseAgreement() {
  var that = this;
  var getUseAgreement = netapi.getUseAgreement;
  netWork.request({
      url: getUseAgreement,
      success: function (res) {
          var _data = res.data.data.context;
          that.setData({
              html: _data
          })
      }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUseAgreement();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})