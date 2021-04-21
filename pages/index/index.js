// 引入request
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList:[],
    // 导航图
    cateList:[],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSwiperListFunc()
   this.getCateListFunc()
   this.getFloorListFunc()
  },
  getSwiperListFunc(){
    // 获取轮播图
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', // 地址
    }).then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  },
  getCateListFunc(){
    // 获取导航图
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems', // 地址
    }).then(res=>{
      this.setData({
        cateList:res.data.message
      })
    })
  },
  getFloorListFunc(){
    // 获取楼层数据
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata', // 地址
    }).then(res=>{
      this.setData({
        floorList:res.data.message
      })
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