var config = require('../../config')

Page({
  data: {
    list: [],
  },
  onLoad: function () {
    wx.request({
      url: config.service.host + '/weapp/phone/info',
      success: (res) => {
        this.setData({ list: res.data.data })
      }
    })
  },
})
