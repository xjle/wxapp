/**
 * 微信支付--企业账号，后台给开发者添加白名单
 * 
 */
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {},
    cartData: [],
    totalPrice:0,
    totalNum:0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync('address'); // 获取缓存地址
    let cartData = wx.getStorageSync('cart') || []; // 购物车数据
    // 筛选购物车数据
    cartData = cartData.filter(v=>v.checked)
    this.setData({
      addressData: address,
    })
    let totalPrice = 0;
    let totalNum = 0;
    cartData.forEach(e=>{
        totalPrice += e.num * e.goods_price;
        totalNum += e.num;
    })
    this.setData({
      cartData,
      totalPrice,
      totalNum
    });
  },
  // 支付事件
  handleOrderPay(){
    // 判断是否存在token
    // 非企业账号不能进行支付权限
    wx.showModal({
      content: '个人小程序，无法支付。',
      showCancel: true,
      title: '提示',
      success: (result) => {
        if (result.confirm) {
          // 手动删除缓存数据
          let newCart = wx.getStorageSync('cart');
          newCart = newCart.filter(v=>!v.checked);
          wx.setStorageSync('cart', newCart);
          wx.navigateTo({
            url: '/pages/order/index',
          })
        }
        return;
      },
    })
    return;
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    };
    // 请求头
    const header = {Authorization:token};
    // 请求体
    const order_rice = this.data.totalPrice;
    const consignee_addr = this.data.addressData.provinceName+this.data.addressData.cityName+this.data.addressData.countyName+this.data.addressData.detailInfo;
    const cartData = this.data.cartData;
    let goods = [];
    cartData.forEach(v=>goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))
    // 发送请求，创建订单
    const orderParams = {order_rice,consignee_addr,goods}
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create',method:"POST",data:orderParams,header}).then(res=>{
      const order_number = res.order_number;
      request({url:'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/req_unifiedorder',method:"POST",data:{order_number},header}).then(result=>{
        const pay = result.pay;
        // 调起微信支付
        wx.requestPayment({
          nonceStr: pay.nonceStr,
          package: pay.package,
          paySign: pay.paySign,
          timeStamp: pay.timeStamp,
          signType: signType,
          success: (res) => {
            console.log("扫码成功");
            request({url:'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/chkOrder',method:"POST",data:{order_number},header}).then(result=>{
              wx.showToast({
                title: '支付成功',
                icon: "none",
                success: (res) => {
                  wx.navigateTo({
                    url: '/pages/order/index',
                  })
                },
              })
            })
          },
        })
        
      })

    })

  }
})