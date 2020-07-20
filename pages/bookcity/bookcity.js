const { default: api } = require("../../http/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
     num:0,
     female:[],
     male:[],
     picture:[],
     press:[],
     females:[],
     males:[]
  },
  city(){
    this.setData({
      num:1
    })
    
  },
  citys(){
    this.setData({
      num:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     api.statistics().then(res=>{
      this.setData({
        female: res.female,
        male:res.male,
        press:res.press,
      }) 
      console.log(res) 
     }).catch(err=>{
      console.log(err)
     });

     api.rankCategory().then(res=>{
      console.log(res)
        res.female.map(item =>{
          item.cover='https://statics.zhuishushenqi.com'+item.cover
        })
        res.male.map(item =>{
          item.cover='https://statics.zhuishushenqi.com'+item.cover
        })
        
       this.setData({
        females:res.female,
        males:res.male
       })
    
     }).catch(err=>{
       console.log(err)
     });
   
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