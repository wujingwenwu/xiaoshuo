const { default: api } = require("../../http/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newHotWords:[],
    value:'',
     arr:[],
     values:[],
    ass: [],
    flag:true,
    HotWords:[],
    hot:''

  },
  onInput(e){
  this.setData({
    value:e.detail.value
  });
 
},
input(){
  api.bookSearch(this.data.value).then(res=>{
    res.books.map(item=>{
      item.cover='https://statics.zhuishushenqi.com'+item.cover
    })
    this.setData({
      arr:res.books,
     
     }) 
     wx.showLoading({
      title: '加载中...'
    })
    setTimeout(() => {
      wx.hideLoading()
      
    }, 1000) 

    this.data.values.push(this.data.value)
    wx.setStorageSync('value',this.data.values)
      console.log(this.data.arr)
   }).catch(err=>{
     console.log(err)
   });
},
// 清空value
image(){
  let asr =wx.getStorageSync('value') 
 this.setData({
   value:"",
   ass:asr,
   flag:true,
   
 })
 wx.showLoading({
  title: '加载中...'
})
setTimeout(() => {
  wx.hideLoading()
  
}, 500) 
},
// 大家都在搜
bindtap(e){
  let items =e.currentTarget.dataset.item.word.book
  console.log(e)
 
  console.log(this.data.hot)
  wx.navigateTo({
    url: `../article/article?_id=${items}`,
  })
},

title(e){
  let item = e.currentTarget.dataset.item
  this.setData({
    value:item.title
  })
 this.input()
},
// 书籍详情
tap(e){
 console.log(e)
 let item= e.currentTarget.dataset.item
 let _id = item._id
 wx.navigateTo({
   url: `../article/article?_id=${_id}`,
 })
},
// 换一换
Change(){
  let index= Math.floor(Math.random()*this.data.newHotWords.length);
  
  this.data.newHotWords.map(item=>{
    let r= Math.floor(Math.random()*256);
    let g= Math.floor(Math.random()*256);
    let b= Math.floor(Math.random()*256);
    let color = `rgb(${r},${g},${b})`
    item.color =color
  })
  this.setData({
    newHotWords:this.data.HotWords.slice(index)
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.hotWord().then(res=>{
      console.log(res)
      this.setData({
        newHotWords:res.newHotWords
      })
      let arr=[]
      res.newHotWords.map(item =>{
        let obj={};
        let r= Math.floor(Math.random()*256);
        let g= Math.floor(Math.random()*256);
        let b= Math.floor(Math.random()*256);
        let color = `rgb(${r},${g},${b})`
        obj.color =color
        obj.word =item
        arr.push(obj)
      })
      
      this.setData({
        newHotWords:arr,
        HotWords:arr
      })     
   console.log(this.data.newHotWords)
    }).catch(err=>{
      console.log(err)
    }); 
  
     let ass =wx.getStorageSync('value')
    
     let array = []
      ass.map(item=>{
      let obj={};
      let r= Math.floor(Math.random()*256);
      let g= Math.floor(Math.random()*256);
      let b= Math.floor(Math.random()*256);
      let color = `rgb(${r},${g},${b})`
      obj.color =color
      obj.title =item
      array.push(obj)
    })
    if(ass){
      this.setData({
        ass: array
       })
    
    } 
   
   
  },
  qing(){
    wx.clearStorageSync('value')
    this.setData({
      flag:false
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中...'
    })
    setTimeout(() => {
      wx.hideLoading()
      
    }, 1000)
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