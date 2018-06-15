import Vue from 'vue'
import App from './comments'

const app = new Vue(App)
app.$mount()

export default {
  config:{
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
    navigationBarTitleText:'评论列表'
  }
}
