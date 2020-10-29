// pages/my/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  goAddressList: function(){

      wx.redirectTo ({
        url :"/pages/shopping/receiver/receiver"
      })

  }
})