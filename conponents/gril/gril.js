const { default: api } = require("../../http/api")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    males:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   flag:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gril(e){
      console.log(e)
      let monthRank=e.currentTarget.dataset.item.monthRank
      let totalRank=e.currentTarget.dataset.item.totalRank
      let title=e.currentTarget.dataset.item.title
      let _id=e.currentTarget.dataset.item._id
      
      wx.navigateTo({
       url: `../../pages/ranking/ranking?monthRank=${monthRank}&totalRank=${totalRank}&title=${title}&_id=${_id}`,
     })
     }
  }
})
