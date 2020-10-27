// pages/classify/classify.js
const app = getApp();
var netapi = require("../../../utils/api.js");
var netWork = require('../../../utils/netWork.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuBotton: app.globalData.menuBotton,
        menuHeight: app.globalData.menuHeight,
        cateItems: [],
        shoppDetailList: [],
        curNav: 1,
        curIndex: 0
    },
    //商品分类详情
    switchRightTab: function (e) {
        let id = e.target.dataset.id, index = e.target.dataset.index;
        var shoppDetailUrl = netapi.shoppTypeDetail + "?appTypeId=" + id;
        netWork.request({
            url: shoppDetailUrl,
            success: (res) => {
                var _data = res.data.data;
                this.setData({
                    shoppDetailList: _data
                })
            }
        })
        this.setData({
            curNav: id,
            curIndex: index
        })
    },
    //商品分类列表
    ShoppTypeList: function () {
        var shoppTypeUrl = netapi.shoppTypeUrl;
        netWork.request({
            url: shoppTypeUrl,
            success: (res) => {
                var _data = res.data.data;
                var shoppDetailUrl = netapi.shoppTypeDetail + "?appTypeId=" + _data[0].app_class_id;
                wx.request({
                    url: shoppDetailUrl,
                    success: (res) => {
                        var _data = res.data.data;
                        this.setData({
                            shoppDetailList: _data
                        })
                    }
                })
                this.setData({
                    cateItems: _data
                })
            }
        })
    },
    //点击品牌
    iqoo: function (e) {
        let name = e.currentTarget.dataset.name;
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/classify/shoppList/shoppList?commodity_name=' + name + "&brand_id=" + id
        })
    },
    //搜索商品
    goSearch: function () {
        wx.navigateTo({
            url: '/pages/index/search/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.ShoppTypeList();//商品分类列表
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