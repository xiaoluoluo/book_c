let appDatas = getApp();
const {commetget, commetpost} = require('../utils/http.js')
Page({
  data: {
    listLi: [],
    page:0,
    scrollTop: 0,
    done: false,
    hidden: true,
    imgpostfix: "",
    showModal: false,
    subjectarry:[],
    clickindex: 0,
    choosetitle:"全科目",
    
  },
  onLoad: function (options) {
    var allselectgrade = Number(wx.getStorageSync('allselectgrade'));
    console.log("allselectgrade", allselectgrade)
    if (allselectgrade) {
      this.setData({
        choosetitle: appDatas.data.subarry[allselectgrade],
        clickindex: allselectgrade
      })
    }
    this.setData({
      imgpostfix: appDatas.data.imgpostfix,
      subjectarry: appDatas.data.subarry,
    });
    this.getList(0);
    
  },
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh")
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    this.getList(0, true);
  },
  getList: function (page, stopPull) {
    let that = this;
    let myurl = appDatas.mainurl.getQuestionList + "?user_id=" + appDatas.data.user_id+"&page=" + page + "&subject_code=" + (this.data.clickindex);
    console.log("myurl--", myurl);
    commetget(myurl).then((res)=>{
      // console.log("请求列表", res);
      if (res==0){
        console.log("请求出错");
        return;
       }
      let alldata = JSON.parse(res.data.data);
      console.log("getQuestionList请求列表", alldata);
      if (page === 0) {
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
      appDatas.data.questionList = that.data.listLi;
    })
  },
  loadMore: function () {
    console.log("加载更多");
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
      console.log("page", page);
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
    wx.navigateTo({
      url: '/pages/compile/compile?id=' + id
      // url: '/pages/upload/upload?id=' + id
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
  onChoose(){
    this.setData({
      choosetitle: this.data.subjectarry[this.data.clickindex]
    })
    //存储选择的科目
    try {
      wx.setStorageSync('allselectgrade', (this.data.clickindex))
    } catch (e) {
      console.log("e1", e);
    }
    this.hideModal();
  }
  // hideModal
})