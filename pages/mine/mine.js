// pages/movies/movies.js

let appDatas = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ userInfo: appDatas.data.usermsg });
   



  },


})