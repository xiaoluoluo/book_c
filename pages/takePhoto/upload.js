// pages/takePhoto/takePhoto.js
let appDatas = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    tempFilePath: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.path = options.path
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth
        var height = res.windowHeight
        var gap = 50
        that.setData({
          width: width,
          height: height,
          gap: gap,
          pwidth: 200,
          pheight: 460,
          pointx: 50,
          pointy: 50,

        })
        wx.getImageInfo({
          src: that.path,
          success: function (res) {
            that.canvas = wx.createCanvasContext("image-canvas", that)
            //过渡页面中，图片的路径坐标和大小
            that.canvas.drawImage(that.path, 0, 0, that.data.width, that.data.height)
            console.log("that.data.width,",that.data.width);
            console.log("that.data.height,", that.data.height);
            wx.showLoading({
              title: '数据处理中',
              mask: true
            })
            that.canvas.setStrokeStyle('red')
            // 这里有一些很神奇的操作,总结就是MD拍出来的照片规格居然不是统一的
            //过渡页面中，对裁剪框的设定
            let pointx = that.data.pointx;
            let pointy = that.data.pointy;
            let pwidth = that.data.pwidth;
            let pheight = that.data.pheight;

            that.canvas.strokeRect(that.data.pointx, that.data.pointy, that.data.pwidth, that.data.pheight)
         
            console.log("四个参数,", "pointx：", pointx, "pointyx：", pointy, "pwidth：", pwidth, "pheight：", pheight);


            that.canvas.draw()
            setTimeout(function () {
              wx.canvasToTempFilePath({//裁剪对参数
                canvasId: "image-canvas",
                x: that.data.pointx+3,//画布x轴起点
                y: that.data.pointx+3,//画布y轴起点
                width: that.data.pwidth-3,//画布宽度
                height: that.data.pheight-3,//画布高度
                destWidth: that.data.pwidth-3,//输出图片宽度
                destHeight: that.data.pheight-3,//输出图片高度
                canvasId: 'image-canvas',
                success: function (res) {
                  that.filePath = res.tempFilePath
                  //清除画布上在该矩形区域内的内容。
                  that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                  // that.canvas.drawImage(that.filePath, that.data.pointx, that.data.pointy, that.data.pwidth, that.data.pheight)
                  // that.canvas.draw()
                  wx.hideLoading()
                  //在此可进行网络请求
                  that.uploadeimage(that.filePath);
                },
                fail: function (e) {
                  wx.hideLoading()
                  wx.showToast({
                    title: '出错啦...',
                    icon: 'loading'
                  })
                }
              });
            }, 1000);
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  uploadeimage: function (tempFilePaths){
    var pathArr = tempFilePaths.split('.');
    var myDate = new Date()
    var ossPath = 'ctb';
    console.log("tempFilePaths", tempFilePaths);

    //  随机生成文件名称
    var fileRandName = Date.now() + "" + parseInt(Math.random() * 1000)
    var fileName = fileRandName + '.' + pathArr[3];
    console.log("fileName", fileName);
    // 要提交的key
    var fileKey = ossPath + '/' + fileName;
    console.log("fileKey", fileKey);
    wx.uploadFile({
      url: 'https://crazynotebook.oss-cn-beijing.aliyuncs.com/',
      filePath: tempFilePaths,
      name: 'file',
      formData: {
        name: tempFilePaths,
        key: fileKey,
        policy: 'eyJleHBpcmF0aW9uIjoiMjAyOS0wNy0yMVQxNTo0Mjo1OC40NzBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsNTI0Mjg4MF1dfQ==',
        OSSAccessKeyId: 'LTAIdUQ05FkCqPC6',
        signature: 'K1ggME66UtaFF6kCI1hpdNYB22w=',
        success_action_status: "200"
      },
      success: function (res) {
        var data = res.data;
        let imageurl = "https://crazynotebook.oss-cn-beijing.aliyuncs.com/ctb/" + fileName
        console.log(imageurl);
      
        let gophotoway = appDatas.data.gophotoway;
        switch (gophotoway) {
          case 1:
            wx.redirectTo({
              url: '/pages/upload/upload?imageurl=' + imageurl
            })
            break;
          case 2:
            appDatas.data.upimageurl = imageurl;
            wx.navigateBack({
              delta: 2
            })
           
            break;
          case 3:
            appDatas.data.upimageurl = imageurl;
            wx.navigateBack({
              delta: 2
            })
           
        }
        // https://crazynotebook.oss-cn-beijing.aliyuncs.com/ctb/1564148981114687.undefined
      },
      fail: function ({ errMsg }) {
        console.log('upladImage fail, errMsg is: ', errMsg)
        wx.showToast({
          title: "上传失败",
          duration: 1000
        })
      },
    })

  }


})