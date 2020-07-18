const { default: api } = require("../../http/api")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
    male:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   

  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    goto(e){
      console.log(e)
     let index = e.currentTarget.dataset.index
     let type = e.currentTarget.dataset.type 
     let name = e.currentTarget.dataset.item.name
    wx.navigateTo({
      url: `../../pages/detail/detail?index=${index}&type=${type}&name=${name}`,
    })
    },
    
  }
})
