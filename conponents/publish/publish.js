// conponents/publish/publish.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    press:{
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
     let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `../../pages/detail/detail?index=${index}&type=${type}&item=${item}`,
    })
    },
  }
})
