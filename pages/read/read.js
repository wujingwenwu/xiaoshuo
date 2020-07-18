const { default: api } = require("../../http/api")
var WxParse = require('../../lib/wxParse/wxParse.js');
// pages/read/read.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id:'',
    chapter:''
  },
  read(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options._id)
   console.log(options.title)
   let _id =options._id
   this.setData({
     _id:_id
   });
   wx.setNavigationBarTitle({
  title:options.title
})
   api.bookChapters(this.data._id).then(res=>{
    api.chapterContent(res.chapters[0].link).then(res1=>{
       let that=this;
     
       let body =res1.chapter.body
       let title =res1.chapter.title
       WxParse.wxParse('body', 'html', body, that, 5)
       WxParse . wxParse('title', 'html', title, that, 5)
      console.log(res)
    }).catch(err=>{
  
    })
    console.log(res)
  }).catch(err=>{
  })

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