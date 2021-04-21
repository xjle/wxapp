// pages/goods_list/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,value:"综合",isActive:true},
      {id:1,value:"销量",isActive:false},
      {id:2,value:"价格",isActive:false}
    ],
    goodsList:[]
  },
  queryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid||"";
    this.queryParams.query = options.query||"";
    this.getGoodsListFunc()
  },
  getGoodsListFunc(){
    // https://api-hmugo-web.itheima.net/api/public/v1/goods/search
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',data:this.queryParams}).then(res=>{
      this.totalPages = Math.ceil(res.data.message.total/this.queryParams.pagesize)
      this.setData({
        // 拼接数组
        goodsList:[...this.data.goodsList, ...res.data.message.goods]
      })
      // 关闭刷新
      wx.stopPullDownRefresh()
    })

  },
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data
    tabs.forEach((v, i)=>{
      i===index?v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.queryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '暂无下一页数据',
      })
    }else{
     
      this.queryParams.pagenum++
      this.getGoodsListFunc()
    }
  },
   /**
   * 页面下拉刷新事件的处理函数
   */
  onPullDownRefresh: function () {
    this.setData({
      goodsList:[]
    })
    this.queryParams.pagenum=1
    this.getGoodsListFunc()
  },
})