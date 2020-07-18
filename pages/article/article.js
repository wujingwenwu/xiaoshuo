const {
  default: api
} = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {},
    num: 0,
    ass: [],
    asr: [],
    book: [],
    object: {},
    flag: true,
    asrr: []
  },
  // 开始阅读
  read(e){
    wx.navigateTo({
      url: `../read/read?_id=${this.data.object}&title=${this.data.obj.title}`,
    })
  },
  // 换一换
  Change() {
    let index = Math.floor(Math.random() * (this.data.asrr.length - 2));
    this.setData({
      ass: this.data.asrr.slice(index, index + 3)
    })
  },
  city() {
    this.setData({
      num: 1
    })

  },
  citys() {
    this.setData({
      num: 0
    })
  },
  book() {
    this.setData({
      flag: false
    })
    let object = {}
    object._id = this.data.obj._id
    object.title = this.data.obj.title
    object.cover = this.data.obj.cover
    this.data.book.push(object)
    let hash = {};
    this.data.book = this.data.book.reduce((item, next) => {
      hash[next.title] ? '' : hash[next.title] = true && item.push(next);
      return item
    }, [])
    wx: wx.setStorageSync('book', this.data.book)
    console.log(this.data.book)


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options._id)
    this.setData({
      object: options._id
    })
    api.bookInfo(options._id).then(res => {
      res.cover = 'https://statics.zhuishushenqi.com' + res.cover
      this.setData({
        obj: res
      })
      let arr = wx.getStorageSync('book')
      if (arr) {
        let index = arr.findIndex(item => {
          return item.title === this.data.obj.title
        })
        console.log(index)
        if (index < 0) {
          this.setData({
            book: arr,
            flag: true
          });
        } else {
          this.setData({
            book: arr,
            flag: false
          });
        }
        console.log(this.data.obj)
      }
    }).catch(err => {});
    api.relatedRecommendedBooks(options._id).then(res => {
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        ass: res.books.slice(0, 3),
        asrr: res.books
      })

    }).catch(err => {

    });
    api.shortReviews(options._id).then(res => {
      res.docs.map(item => {
        item.author.avatar = 'https://statics.zhuishushenqi.com' + item.author.avatar
      })
      this.setData({
        asr: res.docs
      })
    }).catch(err => {

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