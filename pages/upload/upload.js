// pages/upload/upload.js
let appDatas = getApp();
const { commetget, commetpost } = require('../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpostfix: "",
    array: ['数学', '物理', '化学', '英语', '语文', '生物'],
    opacity:1,
    iputvalue1:0,
    iputvalue2: 0,
    iputvalue3: 0,
    upload1: 0,
    upload2: 0,
    loadingimg: "/images/book/loading.png",
    image1:"",
    image2: "",
    image3: "",
    postpram: { "user_id": 100, "question_title": "", "answer_pic": "", "subject_code": 1, "true_title": "", "true_pic": "", "false_title": "", "false_pic": ""},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      array: appDatas.data.subarry,
      imgpostfix: appDatas.data.imgpostfix
    })
    this.upnowdata(options);
  },
  addclick1(){
    this.setData({
      iputvalue1: 1
    })
  },
  addclick2() {
    this.setData({
      iputvalue2: 1
    })
  },
  addclick3() {
    this.setData({
      iputvalue3: 1
    })
  },
  inputEvent1(e){
    console.log("输入值1", e.detail.value,);
    this.data.postpram.question_title = e.detail.value;
  },
  inputEvent2(e) {
    console.log("输入值2", e.detail.value);
  
    this.data.postpram.false_title = e.detail.value;
  },
  inputEvent3(e) {
    console.log("输入值3", e.detail.value);
    this.data.postpram.true_title = e.detail.value;
  },
  uploadphoto1(){
    this.setData({
      upload1: 1
    })
    //设置拍照方式
    appDatas.data.gophotoway = 2;
    // wx.navigateTo({
    //   url: '/pages/takePhoto/takePhoto'
    // })
    wx.navigateTo({
      url: '/pages/cropper/cropper'
    })
    
  },
  uploadphoto2() {
    this.setData({
      upload2: 1
    })
    //设置拍照方式
    appDatas.data.gophotoway =3;
    // wx.navigateTo({
    //   url: '/pages/takePhoto/takePhoto'
    // })
    wx.navigateTo({
      url: '/pages/cropper/cropper'
    })
  },
  uploadall() {
    this.data.postpram.user_id = appDatas.data.user_id
    this.data.postpram.answer_pic = appDatas.data.way1image;
    this.data.postpram.true_pic = appDatas.data.way2image;
    this.data.postpram.false_pic = appDatas.data.way3image;
    console.log("postpram----", this.data.postpram);
    let myurl = appDatas.mainurl.addMyQuestion;
    let registpram = this.data.postpram;
    commetpost(myurl, registpram).then((res)=>{
      if (res == 0) {
        console.log("请求出错");
        return;
      }
      console.log("添加错题成功", res);
          wx.switchTab({
            url: '/pages/list/list'
          })
          wx.showToast({
            title: '添加错题成功！',
          })
    });
  },
  bindPickerChange: function (e) {
    // let selectimg=docu
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.postpram.subject_code = Number(e.detail.value);
    this.setData({
      index: Number(e.detail.value),
      opacity: "none"
    })
  },
  upnowdata: function (options){
    this.setData({
      image1: appDatas.data.way1image,
      image2: appDatas.data.way2image,
      image3: appDatas.data.way3image
    })
    // console.log("upnowdata-", options);
    let gophotoway = appDatas.data.gophotoway;
    switch (gophotoway) {
      case 1:
        if (options){
          if (options.id){
            let itdata = appDatas.data.myquestionList[options.id];
            console.log("itdata", itdata)
            this.setData({
              image1: itdata.answer_pic,
              itemdata: itdata,
              image2: itdata.false_pic,
              image3: itdata.true_pic,
              upload1: 1,
              upload2: 1,
            })
            appDatas.data.way1image = itdata.answer_pic;
            appDatas.data.way2image = itdata.false_pic;
            appDatas.data.way3image = itdata.true_pic;

            }else{
            this.setData({
              image1: options.imageurl,
            })
            appDatas.data.way1image = options.imageurl;
            }
         }
        break;
      case 2:
        this.setData({
          image2: appDatas.data.upimageurl,
        })
        console.log("appDatas.data.upimageurl1", appDatas.data.upimageurl);
        appDatas.data.way2image = appDatas.data.upimageurl;
        // appDatas.data.upimageurl = "";
        break;
      case 3:
        this.setData({
          image3: appDatas.data.upimageurl,
        })
        console.log("appDatas.data.upimageurl2", appDatas.data.upimageurl);
        appDatas.data.way3image = appDatas.data.upimageurl;
        // appDatas.data.upimageurl="";
        break;
    }
  },
  //修改
  amend(){
    this.data.postpram.user_id = appDatas.data.user_id
    this.data.postpram.answer_pic = appDatas.data.way1image;
    this.data.postpram.true_pic = appDatas.data.way2image;
    this.data.postpram.false_pic = appDatas.data.way3image;
    let myurl = appDatas.mainurl.updateQuestion;
    let registpram = { "question_id": this.data.itemdata.question_id, "user_id": appDatas.data.user_id, "question_title": this.data.postpram.question_title, "answer_pic": appDatas.data.way1image, "subject_code": this.data.postpram.subject_code, "true_title": this.data.postpram.true_title, "true_pic": appDatas.data.way3image, "false_title": this.data.postpram.false_title, "false_pic": appDatas.data.way2image}
    console.log("myurl", myurl, registpram);
    commetpost(myurl, registpram).then((res) => {
      if (res == 0) {
        console.log("请求出错");
        return;
      }
      wx.showToast({
        title: "修改成功",
        duration: 1000
      })
      console.log("修改成功", res);
    });
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
    this.upnowdata();
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