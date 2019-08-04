// pages/index/index.js
let appDatas = getApp();
const { commetget, commetpost } = require('../utils/http.js')
let ckicknum =1;
Page({ // 注册当前页面

  /**
   * 页面的初始数据
   */
  data: {
		userInfo: {},
    getWxOpenIdpram: { "app_id": "ddd", "secret": "ffff", "code": "dddddd"},
    registpram: { "user_wid": "luoxiaosong", "user_name": "ddddd", "user_head_pic": "dddd"},
    loginpram:"",
    clickindex:1,
    showModal: false,
    gradedata: [
      { "id": 1, "grade": "高一" }, { "id": 2, "grade": "高二"},{ "id": 3, "grade": "高三"},
      { "id": 4, "grade": "初一"}, { "id": 5, "grade": "初二"}, { "id": 6, "grade": "初三"},
      { "id": 10, "grade": "一年级" }, { "id":11, "grade": "二年级" }, { "id":12, "grade": "三年级" },
      { "id": 13, "grade": "四年级" }, { "id": 14, "grade": "五年级" }, { "id": 15, "grade": "六年级" }, 
      { "id": 7, "grade": "高一" }, { "id": 8, "grade": "高er" }, { "id": 9, "grade": "高一" },
    ],
  },
  onGotUserInfo: function (e) {
      setTimeout(() => {
        ckicknum = 1;
    }, 1000);
    if (ckicknum === 1) {
      ckicknum = 2;
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)
    let that=this;
    if (e.detail.userInfo){
      console.log(e.detail.userInfo);
      appDatas.data.usermsg = e.detail.userInfo;
      let usermsg = e.detail.userInfo;
      var wxopenid = wx.getStorageSync('wxopenid');
      var registpramed = wx.getStorageSync('registpram');
      if (!registpramed){
      if (wxopenid) {
        let myurl = appDatas.mainurl.register;
        let registpram = {"user_wid": wxopenid, "user_name": usermsg.nickName, "user_head_pic":usermsg.avatarUrl}
        commetpost(myurl,registpram).then((res)=>{
          if (res == 0) {
            console.log("myurl",myurl,registpram);
            console.log("请求出错");
            that.loginto(wxopenid);
            ckicknum = 1;
            return;
          }
          console.log("registpram注册成功", res);
          wx.setStorageSync('registpram', usermsg.nickName)
          that.loginto(wxopenid);
          ckicknum = 1;
        });
      }
    }else{
        that.loginto(wxopenid);
    }
   
     }
    }
  },
	handleParent(){
  
		console.log('父元素');
    // 获取登录用户信息
    wx.getUserInfo({
      success: (data) => {
        console.log(data);
        this.setData({ userInfo: data.userInfo });
        appDatas.data.usermsg = data.userInfo;
        console.log("usermsg", appDatas.data.usermsg);
        // this.handleParent();
        // 跳转页面
        // wx.switchTab({
        //   url: '/pages/list/list',
        //   success() {
        //     console.log('跳转成功');
        //   }
        // })
      },
      fail(err) {
        console.log("getUserInfoerr", err);
       
      }
    })
	},
  loginto(wxopenid) {
    let myurl = appDatas.mainurl.login + "?wid=" + wxopenid;
    commetget(myurl).then((res) => {
      console.log("myurl",myurl);
      if (res == 0) {
        console.log("请求出错");
        return;
      }
      console.log("登录成功", res.data);
       let alldata = JSON.parse(res.data.data);
        appDatas.data.user_id = alldata.user_id;
      this.updategrade(alldata.user_id);
       // 跳转页面
        wx.switchTab ({
          url: '/pages/list/list',
          success() {
            console.log('跳转成功');
          }
        })
    });
  },
  //提交自己的年级
  updategrade(user_id){
    let myurl = appDatas.mainurl.updateGrade;
    let registpram = { "user_id": user_id, "user_grade": this.data.clickindex};
    console.log("myurl", myurl, registpram);
    commetpost(myurl, registpram).then((res) => {
      if (res == 0) {
        console.log("请求出错");
        return;
      }
      console.log("提交自己的年级", res);
      //存储年级
      try {
        wx.setStorageSync('mygrade', this.data.clickindex)
      } catch (e) {
        console.log("e3", e);
      }
    });
  },
  registpramto() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log('页面加载完毕');
    try {
      wx.setStorageSync('key', 'value4')
    } catch (e) { }
    try {
      var value = wx.getStorageSync('key')
      if (value) {
        // Do something with return value
        console.log("value", value);
      }
    } catch (e) {
      // Do something when catch error
    }
		// console.log(this)
		// 开启定时器，发送ajax请求
    // setTimeout(() => {
    //   wx.switchTab({
    //     url: '/pages/list/list',
    //     success() {
    //       console.log('跳转成功');
    //     }
    //   })
    // }, 100);
    let mygrade = wx.getStorageSync('mygrade');
    console.log("mygrade", mygrade)
    if (mygrade){
         this.setData({
           clickindex: mygrade
         })
     }
    try {
      var wxopenid = wx.getStorageSync('wxopenid')
      if (wxopenid) {
        // Do something with return value
        console.log("wxopenid2", wxopenid);
      }
    } catch (e) {
      // Do something when catch error
      console.log("e2", e);
    }
    let that=this;
    if (!wxopenid){
      wx.login({
        success(res) {
          console.log('res',res)
          if (res.code) {
            let myurl = appDatas.mainurl.getWxOpenId;
            let registpram = { "app_id": "wxf6a8a5f5e132c5ba", "secret": "fb4d4f5975c5c0c33628fb18cf249ee5", "code": res.code }
            // console.log('myurl', myurl)
            // console.log('registpram', registpram)
            commetpost(myurl, registpram).then((res) => {
              if (res == 0) {
                console.log("请求出错");
                return;
              }
              console.log("服务器上的openid", res.data);
              let aiidata = JSON.parse(res.data.data);
              let reswxopenid = aiidata.openid;
              console.log("wxopenid", reswxopenid);
              //存储openid
              try {
                wx.setStorageSync('wxopenid', reswxopenid)
              } catch (e) {
                console.log("e3", e);
              }
            });
          }
        }
      })
     }else{
      console.log("存在openid", wxopenid);
     }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		console.log('页面初始化渲染完毕');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		console.log('页面显示完毕');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
		console.log('页面隐藏毕');
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
  choosegradle(e){
    let index = parseInt(e.currentTarget.dataset.index);
    console.log("index" + index);
    this.setData({
      clickindex: Number(index)
    });
  },
 
})