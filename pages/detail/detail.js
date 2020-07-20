const {
  default: api
} = require("../../http/api")

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    ass: [],
    gender: '',
    type: 'hot',
    major: '',
    minor: '',
    start: 0,
    limit: 20,
    sex: '',
    name: '',
    index: '',
    book: '',
    items:'',
    asr: [],
    ids: '',
   _id:"",
    
    activeIndex: 0,
    activeIndexs: 0,
    index: -1,
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
  },
  book(e){

 let _id=e.currentTarget.dataset.item.title._id
 this.setData({
   _id:_id
 })
 wx.navigateTo({
  url: `../article/article?_id=${_id}`,
})
  },
  content(e) {
   
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    this.setData({
      activeIndex: index,
      type: id
    })
    this.get()
  },
  contents(e) {
   
    let index = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    if (item === '全部') {
      this.setData({
        items: '',
        activeIndexs: index,
      })
    } else {
      this.setData({
        activeIndexs: index,
        items:item
      })
    }
    this.get()
  },
 
  get() {
    api.genders({
      gender: this.data.sex,
      type: this.data.type,
      major: this.data.name,
      minor: this.data.items,
      start: this.data.start
    }).then(res => {
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
        item.tag = item.tags.slice(0, 3)
      })
      this.setData({
        book: res.books
      })
      let array = []
      this.data.book.map(item => {
        let obj = {};
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = `rgb(${r},${g},${b})`
        obj.color = color
        obj.title = item
        array.push(obj)
        item.title.tags
      })
      this.setData({
        book: array
      })
   
    }).catch(err => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index)
    console.log(options.name)
    console.log(options.type)
    // this.data.type=options.type
    this.setData({
      name: options.name,
      index: options.index,
      sex: options.type
    })
    api.getCats().then(res => {

      if (this.data.sex === "male") {
        res.male.map(item => {
          item.mins.unshift("全部")
        });
        this.setData({
          arr: res.male.slice(options.index, Number(options.index) + 1),
        })
        console.log(this.data.arr)
        this.data.ass.map(item => {
          this.setData({
            major: item.major
          })
          console.log(this.data.major)
        })
        console.log(this.data.arr[0])
        console.log(this.data.arr)
      }
      if (this.data.sex === "female") {
        res.female.map(item => {
          item.mins.unshift("全部")
        })
        this.setData({
          ass: res.female.slice(options.index, Number(options.index) + 1),
          types: res.major
        })
        this.data.ass.map(item => {
          this.setData({
            major: item.major
          })
          console.log(this.data.major)
        })
        console.log(this.data.ass)
      }
      if (this.data.sex === "press") {
        res.female.map(item => {
          item.mins.unshift("全部")
        })
        this.setData({
          asr: res.press.slice(options.index, Number(options.index) + 1),
        })
      }

     
    }).catch(err => {
      console.log(err)
    });
   
    this.get()
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
    this.setData({
      start:this.data.start + 20
     })
     wx.showLoading({
      title: '加载中...'
    })
    setTimeout(() => {
      wx.hideLoading()
      
    }, 500)
     this.get()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})