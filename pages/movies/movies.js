let appDatas = getApp();
const {commetget, commetpost} = require('../utils/http.js')
Page({
  data: {
    listLi: [],
    page: 0,
    scrollTop: 0,
    done: false,
    hidden: true,
    imgpostfix: "",
    showsub:"",
    havedata:0,
    remindertex:"开始记录第一道题目吧！",
    loadingimg: "/images/book/loading.png",
    subjectarry: [],
    clickindex: 0,
    choosetitle: "全科目",
    shareimage:""
  },
  onLoad: function (options) {
    var allselectgrade = Number(wx.getStorageSync('myselectgrade'));
    console.log("allselectgrade", allselectgrade)
    if (allselectgrade) {
      this.setData({
        choosetitle: appDatas.data.subarry[allselectgrade],
        clickindex: allselectgrade
      })
    }
    this.setData({
      imgpostfix: appDatas.data.imgpostfix,
      showsub: appDatas.data.subarry,
      subjectarry: appDatas.data.subarry,
    });
    this.getList(0);
  },
  onPullDownRefresh: function () {
    // console.log("onPullDownRefresh")
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    this.getList(0, true);
  },
  getList: function (page, stopPull) {
    let that = this;
    // let myurl = appDatas.mainurl.getMyAllQuestion + "?user_id=" + appDatas.data.user_id+"&page=" +0;
    let myurl = appDatas.mainurl.getMyAllQuestion + "?user_id=" + appDatas.data.user_id + "&page=" + page + "&subject_code=" + (this.data.clickindex );
    console.log("myurl===", myurl);
    commetget(myurl).then((res) => {
      if (res == 0) {
        console.log("请求出错");
        return;
      }
      let alldata =JSON.parse(res.data.data);
      console.log("getMyAllQuestion请求列表", alldata);
      if (page === 0) {
        if (alldata.length>0) {
            that.setData({
              havedata: 1,
              remindertex: "添加错题"
            })
        that.setData({
          listLi: alldata,
          done: false
        })
        if (stopPull) {
          wx.stopPullDownRefresh()
        }
        if (that.data.listLi.length <= 0) {
          return;
        }
        if (that.data.listLi.length % 10 == 0) {
          that.setData({
            page: page + 1,
          })
        }
       }else{
          that.setData({
            havedata: 0,
            remindertex: "选择科目",
            listLi: alldata,
          })
       }
      } else {
        if (that.data.listLi.length <= 0) {
          return;
        }
        if (that.data.listLi.length % 10 == 0) {
          that.setData({
            page: page + 1,
            listLi: that.data.listLi.concat(alldata),
            // done: true
          })
        } else {
          that.setData({
            listLi: that.data.listLi.concat(alldata),
            done: true
          })
        }
      }
      appDatas.data.myquestionList = that.data.listLi;
    });
  },
  loadMore: function () {
    var done = this.data.done;
    if (done) {
      return
    } else {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500
      });
      var page = this.data.page;
      this.getList(page)
    }
  },
  scrll: function (e) {
    var scrollTop = e.detail.scrollTop
    if (scrollTop > 600) {
      this.setData({
        scrollTop: 1,
        hidden: false
      })
    } else {
      this.setData({
        scrollTop: 1,
        hidden: true
      });
    }
  },
  goTop: function () {
    this.setData({
      scrollTop: 0,
      hidden: true
    })
  },
  toDetail(event) {
    console.log(event);
    let id = event.currentTarget.dataset.id;
    // console.log("event---", event);
    console.log("id---", id);
    //设置拍照方式
    appDatas.data.gophotoway = 1;
    wx.navigateTo({
      // url: '/pages/compile/compile?id=' + id
      url: '/pages/upload/upload?id=' + id
    })
  },
  uploadImage: function () {
    //设置拍照方式
    appDatas.data.gophotoway = 1;
    // wx.navigateTo({
    //   url: '/pages/takePhoto/takePhoto'
    // })
    //  wx.navigateTo({
    //    url: '/pages/cropper2/index'
    // })
    wx.navigateTo({
      url: '/pages/cropper/cropper'
    })
  },
  toShowModal(e) {
    this.setData({
      showModal: true
    })
  },

  hideModal() {
    this.setData({
      showModal: false
    });
  },
  choosegradle(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    console.log("index" + index);
    this.setData({
      clickindex: Number(index)
    });
    this.getList(0, true);
  },
  onChoose() {
    this.setData({
      choosetitle: this.data.subjectarry[this.data.clickindex]
    })
    //存储选择的科目
    try {
      wx.setStorageSync('myselectgrade', (this.data.clickindex))
    } catch (e) {
      console.log("e2", e);
    }
    this.hideModal();
  },
  chooseshare(event){
    // console.log(event);
    let id = event.currentTarget.dataset.id;
    console.log("id---", id);
    let itdata = appDatas.data.myquestionList[id];
    this.setData({
      shareimage: itdata.answer_pic,
    })
  },
  onShareAppMessage: function (res) {
    setTimeout(() => {
        if (res.from === 'button') {
          // 来自页面内转发按钮

        }
        return {
          title: '记录学习每一刻',
          imageUrl: this.data.shareimage,
        }
    }, 100);
    // let id = res.currentTarget.dataset.id;
    // console.log("分享---", res);
  
  },
  //删除
  deletedMyQuestion(event) {
    let id = event.currentTarget.dataset.id;
    console.log("id---", id);
    let itdata = appDatas.data.myquestionList[id];
    let myurl = appDatas.mainurl.deletedMyQuestion;
    let registpram = { "question_id": itdata.question_id}
    commetpost(myurl, registpram).then((res) => {
      if (res == 0) {
        console.log("请求出错");
        that.loginto(wxopenid);
        return;
      }
      this.getList(0, true);
      console.log("删除",res);
      wx.showToast({
        title: "删除成功",
        duration: 1000
      })
    });
  },
})