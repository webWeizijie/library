import qcloud from 'wafer2-client-sdk'

// const HOST = 'http://192.168.1.193:5757';
const HOST = 'https://0iiwowaf.qcloud.la'
const config = {
  host: HOST,
  user: HOST + '/weapp/user',
  login: HOST + '/weapp/login'
}

function request(method, url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
          resolve(res.data)
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
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: e.mp.detail.encryptedData,
          iv: e.mp.detail.iv,
        }
        qcloud.requestLogin({
          loginParams,
          success(options) {
            if (options.userinfo) {
              resolve(options.userinfo)
            }
          },
          fail(error) {
            reject(error)
          }
        });
      },
      fail: function (loginError) {
        reject(loginError)
      },
    });
  })
}

export {
  config,
  request,
  getUserInfo
}
