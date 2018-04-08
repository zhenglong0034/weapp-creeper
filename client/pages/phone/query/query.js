var config = require('../../../config')

Page({
  data: {
    list: [],
    number: 0,
    key: '',
    animationData: {}
  },
  bindKeyInput: function(event) {
    this.setData({
      key: event.detail.value
    })
  },
  submit: function(event) {
    // var that = this
    wx.request({
      method: 'post',
      data: {
        key: this.data.key
      },
      url: config.service.host + '/weapp/search/phone',
      success: (res) => {
        console.log(res)
        this.setData({ list: res.data.data }, () => {
          if(this.data.list.length) this.anima()
        })
      }
    })
  },
  anima: function() {
    let animation = wx.createAnimation({
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.translateY(-150).step()
    this.setData({
      animationData:animation.export()
    })
  }
})
