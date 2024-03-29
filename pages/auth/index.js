// pages/auth/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleGetUserInfo(e){
    // 用户信息
    const {encryptedData,iv,rawData,signature} = e.detail;
    wx.login({
      timeout: 10000,
      success:(res)=>{
        const {code} = res;
        const loginParams = {encryptedData,iv,rawData,signature,code};
        request({url:'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',data:loginParams,method:"POST"}).then(result=>{
            const token = result.token;
            if (token) {
              wx.setStorageSync('token', token);
              // // 返回上一层
              // wx.navigateBack({
              //   delta: 1,
              // })
            }
            wx.navigateBack({
              delta: 1,
            })
         })
      }
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