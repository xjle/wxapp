// pages/category/index.js
// 引入request
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    currentIndex:0,
    rightContentList:[]
  },
  // 接口数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 本地缓存：
     * 判断是否有数据
     * 没有发请求
     * 有--判断是否过期--过期请求，否则调用本地缓存
     * 
     */
    const Cates = wx.getStorageSync('cates');
    if(!Cates){
      this.getCatesFunc()
    }else{
      if(Date.now() - Cates.time > 1000*60*30){
        this.getCatesFunc()
      }else{
        this.Cates=Cates.data
         // 左侧
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        // 右侧
        let rightContentList = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
  },
  getCatesFunc(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories', // 地址
    }).then(res=>{
      this.Cates = res.data.message;
      wx.setStorageSync('cates',{time:Date.now(),data:this.Cates}) // 存本地
      // 左侧
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      // 右侧
      let rightContentList = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContentList
      })
    })
  },
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContentList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContentList
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