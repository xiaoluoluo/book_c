// pages/takePhoto/takePhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    gap: 50,
    hasTakePhoto: false,
    src: "",
    makephoto: "/images/book/right.png",
    giveup: "/images/book/err.png",
    pwidth:200,
    pheight: 460,
    pointx: 50,
    pointy:50,
    takep:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    that.ctx = wx.createCameraContext()
    // that.canvas = wx.createCanvasContext("image-canvas", this);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight,
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  giveup: function () {
    wx.navigateBack({
    
    })
  },
  /**
   * 拍照
   */
  takePhoto: function() {
    
    var that = this
    that.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.setStorage({
          key: 'originalImagePath',
          data: res.tempImagePath,
          takep:true,
        })
        wx.navigateTo({
          url: 'upload?path=' + res.tempImagePath + '&char=0'
        })
      
      }
    })
  }


    

})