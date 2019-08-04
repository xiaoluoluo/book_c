// pages/compile.js
let appDatas = getApp();
const { commetget, commetpost } = require('../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemdata:"",
    subjects:"",
    imgpostfix: "",
    loadingimg:"/images/book/loading.png",
    comment:"",
    questionid:0,
    commentlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options", options);
    console.log("appDatas.data.questionList[options]", appDatas.data.questionList[options.id]);
    let itdata = appDatas.data.questionList[options.id];
    let sub = itdata.Question.subject_code;
    this.setData({
      itemdata: appDatas.data.questionList[options.id],
      subjects: appDatas.data.subarry[sub],
      imgpostfix: appDatas.data.imgpostfix,
      questionid: appDatas.data.questionList[options.id].Question.question_id,
    });
    this.getallcomment();
  },
  /** 
     * 预览图片
     */
  previewImage1: function (e) {
    let image1 = this.data.itemdata.Question.answer_pic + this.data.imgpostfix;
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [image1] // 需要预览的图片http链接列表
    })
  } , 
  previewImage2: function (e) {
    let image1 = this.data.itemdata.Question.false_pic + this.data.imgpostfix;
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [image1] // 需要预览的图片http链接列表
    })
  }, 
  previewImage3: function (e) {
    let image1 = this.data.itemdata.Question.true_pic + this.data.imgpostfix;
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [image1] // 需要预览的图片http链接列表
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

  },
  previewImg: function (e) {
    let image1 = this.data.image1;
    let image2 = this.data.image2;
    let image3 = this.data.image3;

    this.setData({
      imgArr: [image1, image2, image3]
    })
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  inputEvent(e) {
    console.log("输入值3", e.detail.value);
    this.setData({
      comment: e.detail.value
    })
  
  },
  //提交评论
  submitcomment(){
     setTimeout(() => {
       let myurl = appDatas.mainurl.addQuestionComment;
       let registpram = { "user_id": appDatas.data.user_id, "question_id": Number(this.data.questionid), "comment_intro": this.data.comment }
       console.log("myurl", myurl, registpram);
       commetpost(myurl, registpram).then((res) => {
         if (res == 0) {
           console.log("请求出错");
           return;
         }
         console.log("提交评论成功", res);
         wx.showToast({
           title: "评论发表成功",
           duration: 1000
         })
       });
    }, 200);

  },
   //获取评论
  getallcomment() {
    let myurl = appDatas.mainurl.getQuestionComment + "?question_id=" + Number(this.data.questionid);
    commetget(myurl).then((res) => {
      console.log("myurl", myurl);
      if (res == 0) {
        console.log("请求出错");
        return;
      }
      let comentlist = JSON.parse(res.data.data);
      console.log("获取评论", JSON.parse(res.data.data) );
      this.setData({
        commentlist: comentlist
      })
      // setTimeout(() => {
      //   this.pullcomment();
      // },100);
    });
  },

  //刷新评论
  pullcomment() {
    let myurl = appDatas.mainurl.getQuestionComment + "?question_id=" + Number(this.data.questionid);
    commetget(myurl).then((res) => {
      console.log("myurl", myurl);
      if (res == 0) {
        console.log("请求出错");
        return;
      }
      let comentlist = JSON.parse(res.data.data);
      console.log("获取评论2", JSON.parse(res.data.data));
      this.setData({
        commentlist: comentlist
      })
    
    });
  }
})