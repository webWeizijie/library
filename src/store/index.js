import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    user:{
      hasLogin:false,
      userInfo:{}
    }
  },
  mutations:{
    initUserInfo(state){
      let user = wx.getStorageSync('userInfo')

      if(user){
        state.user.hasLogin = true;
        state.user.userInfo = user
      }
    },
    setUserInfo(state,userInfo){
      state.user.hasLogin = true;
      state.user.userInfo = userInfo
      wx.showLoading({
        title:'登录成功',
        druation:2000
      })
    }
  }

})
