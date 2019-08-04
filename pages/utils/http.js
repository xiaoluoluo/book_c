 function commetget (myurl) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: myurl,
      method: "get",
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.errCode  == 0) {
          // console.log("res", res);
          resolve(res);
        } else {
          resolve(0);
        }
      },
      fail(err) {
        resolve(0);
      }
    })
  });
}
function commetpost(myurl, registpram) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: myurl,
      method: "POST",
      data: registpram,
      header: {
        "Content-Type": "application/raw"
      },
      success(res) {
        if (res.data.errCode == 0) {
          resolve(res);
        } else {
          resolve(0);
          console.log("err", res);
        }
      },
      fail(err) {
        resolve(0);
      }
    })
  });

}
module.exports = { commetget, commetpost}