<template>
  <div>
      <Swiper :tops="tops" v-if="tops.length > 0"></Swiper>
      <Card :key='book.id' v-for='book in books' :book="book"></Card>
      <div class="text-bottom" v-if="!more">已经到底了</div>
  </div>
</template>
<script>
import { request } from "../../utils/biz.js";
import Swiper from "../../components/Swiper/Swiper";
import Card from "../../components/Card/Card";
export default {
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      tops:[]
    };
  },
  created() {},
  mounted() {
    this.getBookList(true);
    this.getTop();
  },
  onPullDownRefresh() {
    this.getBookList(true);
    this.getTop();
  },
  onReachBottom() {
    if (this.more) {
      this.getBookList();
    } else {
      return false;
    }
  },
  methods: {
    async getTop() {
      const tops = await request("GET","/weapp/top");
      this.tops = tops.data.list;
    },
    async getBookList(init) {
      if (init) {
        this.page = 0;
        this.more = true;
      }

      wx.showLoading({
        title: "加载中"
      });
      wx.showNavigationBarLoading();
      const res = await request("GET", "/weapp/booklist", { page: this.page });

      if (res.code == 0 && res.data.list != []) {
        if (this.page == 0) {
          this.books = res.data.list;
        } else {
          this.books = this.books.concat(res.data.list);
        }

        if (res.data.list.length < 10 && this.page > 0) {
          this.more = false;
        }
        this.page++;
      }

      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      wx.hideLoading();
    }
  },
  components: {
    Card: Card,
    Swiper:Swiper
  }
};
</script>
<style>
page {
  min-height: 100%;
  background: #f8f8f8;
}
</style>
