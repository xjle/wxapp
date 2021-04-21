// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {},
    cartData: [],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 收地址按钮事件
  handleChooseAddress(){
    // 获取权限
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress == true || scopeAddress == undefined){
          // 调用收货地址
          wx.chooseAddress({
            success: (res) => {
              // 缓存
              wx.setStorageSync('address', res);
              
            }
          })
        }else{
          // 打开权限
          wx.openSetting({
            success: (result) => {
              wx.chooseAddress({
                success:(res)=>{
                  wx.setStorageSync('address', res)
                  
                }
              })
            }
          })
        }
      }
    })
    
  },
  // 商品选中
  handelItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cartData} = this.data;
    let index = cartData.findIndex(v=>v.goods_id===goods_id);
    cartData[index].checked = !cartData[index].checked;
    this.setCart(cartData)
  },
  setCart(cartData){
    // const allChecked = cartData.length ? cartData.every(v=>v.checked) : false; // 全选
    let allChecked = cartData.length ? true : false;
    let totalPrice = 0;
    let totalNum = 0;
    cartData.forEach(e=>{
      if(e.checked){
        totalPrice += e.num * e.goods_price;
        totalNum += e.num;
      }else{
        allChecked = false
      }
    })
    this.setData({
      cartData,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('cart', cartData);

  },
  // 全选功能
  handleAllChange(){
    let {cartData, allChecked} = this.data;
    allChecked = !allChecked;
    cartData.forEach(v=>{
      v.checked=allChecked
    });
    this.setCart(cartData);
  },
  // 商品数量编辑
  handeItemNumEdit(e){
    let {operation, id} = e.currentTarget.dataset;
    let {cartData} = this.data;
    const index = cartData.findIndex(v=>v.goods_id==id);
    // const _this = this;
    if(cartData[index].num === 1 && operation === -1){
      wx.showModal({
        title: '提示',
        content:'是否删除该宝贝？',
        success: (result) => {
          if (result.confirm) {
            cartData.splice(index,1);
            this.setCart(cartData);
          }
        },
      })
    }else{
      cartData[index].num += operation;
      this.setCart(cartData);
    }
   
    
  },
  // 结算
  handlePay(){
    const {addressData, totalNum} = this.data;
    if (!addressData.userName) {
      wx.showToast({
        title: '您还没有选择收获地址',
        icon: 'none'
      })
      return;
    }
    if(totalNum===0){
      wx.showToast({
        title: '您还没选购商品',
        icon: 'none'
      })
      return;
    }
    // 跳转页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync('address'); // 获取缓存地址
    const cartData = wx.getStorageSync('cart') || []; // 购物车数据
    this.setData({
      addressData: address,
    })
    this.setCart(cartData)
  },
  
})