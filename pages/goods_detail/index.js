// pages/goods_detail/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetails:{},
    isCollect: false, // 是否被收藏
  },
  // 商品列表
  goodInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   const {id} = options
  //   this.getGoodsDetailFunc(id)
  // },
  onShow:function(){
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const {id} = options
    this.getGoodsDetailFunc(id)
  },
  getGoodsDetailFunc(id){
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',data:{goods_id:id}}).then(res=>{
      let data = res.data.message      
      this.goodInfo = data
      let collect = wx.getStorageSync('collect') || [];
      let isCollect = collect.some(v=>v.goods_id===this.goodInfo.goods_id)
      this.setData({
        goodDetails:{
          goods_name:data.goods_name,
          pics:data.pics,
          goods_price:data.goods_price,
          goods_introduce:data.goods_introduce.replace(/\.webp/g,'.jpg'),
        },
        isCollect
      })

    })
  },
  // 放大预览
  handlePreveewImage(e){
    // 构造预览图片数组
    const urls = this.goodInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      urls,
      current
    })
  },
  //  加入购物车
  handleCartAdd(){
    // 获取缓存数据
    let cart = wx.getStorageSync("cart")||[];
    // 判断商品对象是否存在
    let index = cart.findIndex(v=>v.goods_id==this.goodInfo.goods_id)
    if (index === -1) {
      // 不存在
      this.goodInfo.num = 1
      this.goodInfo.checked = true
      cart.push(this.goodInfo)
    }else{
      // 存在
      cart[index].num++
    }
    // 更新缓存
    wx.setStorageSync('cart', cart)
    // 弹窗
    wx.showToast({
      title:'加入成功',
      icon: 'success',
      mask: true,
    })
  },
  // 点击收藏
  handleCollect(){
    let isCollect = false;
    let collect =  wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v=>v.goods_id===this.goodInfo.goods_id);
    if(index !== -1 ){
      // 已收藏
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        mask:true, // 遮罩层
      })
    }else{
      collect.push(this.goodInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        mask:true, // 遮罩层
      })
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })

  }
})