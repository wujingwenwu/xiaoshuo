import api from "../../http/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    flag:false
  },

  bang(){
    wx.navigateTo({
      url:"../help/help"
    })
  },
  // 显示删除
  qingkong(){
    if(this.data.flag===false){
      this.setData({
        flag:true
      })
    }else{
      this.setData({
        flag:false
      })
    };
  },
  // 删除
  image: function (e) {
    console.log(e)
    let index =e.currentTarget.dataset.index
    let book = this.data.books
    console.log(book)
    book.splice(index,1)
    this.setData({
      book:book
    })
    wx.setStorageSync('book', book)
    let books = wx.getStorageSync('book')
    this.setData({
      books:books
    });
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
    let book =wx.getStorageSync('book')
    this.setData({
      books:book
    })
    console.log(this.data.books)
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