const { default: api } = require("../../http/api")

// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    titles:'',
    totalRank:'',
    monthRank:'',
    _id:'',
    book:[],
  },
  book(e){
    console.log(e)
    let _id=e.currentTarget.dataset.item._id
    this.setData({
      _id:_id
    })
    wx.navigateTo({
     url: `../article/article?_id=${_id}`,
   })
     },
  city(){
    this.setData({
      num:1
    }) 
    this.getranging(this.data.monthRank)
  },
  citys(){
    this.setData({
      num:0
    })
    this.getranging(this.data._id)
  },
  cityss(){
    this.setData({
      num:2
    })
    this.getranging(this.data.totalRank)
  },
  getranging(id){
     api.rankInfo(id).then(res=>{
       res.ranking.books.map(item=>{
         item.cover='https://statics.zhuishushenqi.com' + item.cover
       })
      this.setData({
        book:res.ranking.books
      })
      console.log(this.data.book)
      console.log(res)
     }).catch(err=>{
      console.log(err)
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getranging(options._id)
  console.log(options.title)
  console.log(options.totalRank)
  console.log(options.monthRank)
  console.log(options._id)
wx.setNavigationBarTitle({
  title:options.title
})
  let title = options.title 
  let totalRank = options.totalRank 
  let monthRank = options.monthRank 
  let _id = options._id 
  this.setData({
    titles:title,
    totalRank:totalRank,
    monthRank:monthRank,
    _id:_id,
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
    wx.showLoading({
      title: '加载中...'
    })
    setTimeout(() => {
      wx.hideLoading()
      
    }, 500)
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