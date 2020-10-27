// pages/index/index/index.js
const app = getApp();
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var netapi = require('../../../utils/api.js');
var NotWork = require('../../../utils/netWork.js');
var qqmapsdk = new QQMapWX({
  key:'ACUBZ-DBG3X-JGX4H-7RXDI-4KFLQ-JVBWH'//必填，地图申请的key
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    city: "",
    car: "",
    carImg: "",
    swiperList: [],//轮播图
    Services: [],//首页type
    shoppList: [],//商品分类
    shopList: [],//附近门店
    latitud: null,
    longitud: null,
    markers: [],
    diDeail: "",
    imagePrefix: netapi.imagePrefix,//图片路径
    KFtell: '',
    showModal: false,
    id: '',
    title: '',
    custom_car_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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