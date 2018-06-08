import qcloud from 'wafer2-client-sdk'

const config = {
  host: 'http://localhost:5757'
}

function request(method, url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        if (res.data.MsgCode == 1) {
          resolve(res.data.data)
        }
      },
      fail: function (res) {
        reject(res)
      },
      complete: function () {
        // complete
      }
    })
  })
}

function getUserInfo(e) {
  wx.showToast({
    title: '获取中',
    icon: 'loading',
    duration: 2000
  })
  return new Promise((resolve,reject) => {
    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: e.mp.detail.encryptedData,
          iv: e.mp.detail.iv,
        }
        qcloud.setLoginUrl(config.host+'/weapp/login')
        qcloud.requestLogin({
          loginParams,
          success(options) {
            if(options.userinfo){
              resolve(options.userinfo)
            }
            wx.hideToast()
          },
          fail(error) {
            reject(error)
            wx.hideToast()
          }
        });
      },
      fail: function (loginError) {
        reject(loginError)
        wx.hideToast()
      },
    });
  })
}

export {
  config,
  request,
  getUserInfo
}
