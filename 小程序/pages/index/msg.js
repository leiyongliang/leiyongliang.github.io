// pages/index/msg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    list: '',
    author: '',
    dynasty: '',
    istranslate: false,
    btn: '翻译'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      content: app.data.origin.content,
      author: app.data.origin.author,
      title: app.data.origin.title,
      dynasty: app.data.origin.dynasty
    })
  },
  translate: function() {
    this.setData({
      istranslate: !this.data.istranslate
    })
    if (this.data.istranslate) {
      if (!app.data.origin.translate) {
        app.data.origin.translate = ['暂无翻译']
      }
      
      this.setData({
        content: app.data.origin.translate,
        btn: '原诗'
      })
    } else {
      this.setData({
        content: app.data.origin.content,
        btn: '翻译'
      })
    }
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