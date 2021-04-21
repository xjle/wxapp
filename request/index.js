let ajaxTimes = 0; // 页面多请求
export const request=params=>{
  ajaxTimes++
  // 加载
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      success:(res)=>{
        // 成功
        resolve(res)
      },
      fail:(err)=>{
        // 失败
        reject(err)
      },
      complete:()=>{
        // 完成
        ajaxTimes--
        if(ajaxTimes==0){
          // 隐藏加载框
          wx.hideLoading()
        }
       
      }
    })
  })
}