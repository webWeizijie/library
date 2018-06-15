<template>
  <div class="container" >
    <CommonList v-if="comments.length > 0" type="user" :comments='comments'></CommonList>
    <div v-if="books.length > 0">
      <div class="page-title">我的图书</div>
      <Card :book="book" v-for="book in books" :key='book.id'></Card>
    </div>
  </div>
</template>

<script>
import { request } from "@/utils/biz.js";
import store from "../../store/index.js";
import CommonList from "@/components/CommonList/CommonList";
import Card from "@/components/Card/Card";
export default {
  data() {
    return {
      comments: [],
      books:[]
    };
  },
  onShow(){
    if (this.user.hasLogin) {
      this.init()

    }
  },
  onpullDownRefresh(){
    this.init()
    wx.stopPullDownRefresh()
  },
  components: {
    CommonList: CommonList,
    Card:Card
  },

  methods: {
    init(){
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks(){
      const books = await request('GET','/weapp/booklist',{
        openid: this.user.userInfo.openId
      })

      this.books = books.data.list

    },
    async getComments() {
      wx.showLoading({
        title:'加载中'
      })
      const comments = await request("GET", "/weapp/commentuser", {
        openid: this.user.userInfo.openId
      });

      if (comments.code == 0) {
        this.comments = comments.data.list;
      }
      wx.hideLoading()
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
  },
  computed: {
    user() {
      return store.state.user;
    }
  }
};
</script>

<style scoped>
</style>
