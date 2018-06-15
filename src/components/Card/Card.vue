<template>
  <a :href="detailUrl">
    <div class="book-card flex-row">
      <div class="thumb" @click.stop="preview(book.image)">
        <img :src="book.image" alt="" srcset="" mode="aspectFit">
      </div>
      <div class="detail-box">
        <div class="detail">
          <div class="book-name text-primay">{{book.title}}</div>
          <div class="book-rate text-primay">{{book.rate}}<Rate :value='book.rate'></Rate></div>
        </div>
        <div class="detail">
          <div class="book-name">{{book.author}}</div>
          <div class="book-rate">浏览量: {{book.count}}</div>
        </div>
        <div class="detail">
          <div class="book-name">{{book.publisher}}</div>
          <div class="book-rate"><img class="user-avatar" :src="book.user_Info.avatarUrl" >{{book.user_Info.nickName}} </div>
        </div>
      </div>

    </div>
  </a>
</template>
<script>
import Rate from "../Rate/Rate";

export default {
  props: ['book'],
  data() {
    return {};
  },
  mounted() {
    this.book.user_Info = JSON.parse(this.book.user_Info);
  },
  methods: {
    preview(imgUrl) {
      wx.previewImage({
        urls: [imgUrl],
        success: function(res) {
          // success
        }
      });
    }
  },
  components: {
    Rate: Rate
  },
  computed: {
    detailUrl() {
      return "/pages/detail/main?id=" + this.book.id;
    }
  }
};
</script>
<style>
.book-card {
  padding: 10rpx 20rpx 10rpx 0;
  overflow: hidden;
  margin-top: 16rpx;
  margin-bottom: 16rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.book-card .thumb {
  width: 180rpx;
  height: 180rpx;
  overflow: hidden;
}
.book-card .thumb img {
  max-width: 100%;
  max-height: 100%;
}
.book-card .detail-box {
  flex-grow: 1;
}
.book-card .detail {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10rpx;
}
.book-card .detail .book-name {
  font-size: 30rpx;
  width: 360rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.book-card .detail .book-rate {
  font-size: 28rpx;
}
.book-card .user-avatar{
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 20rpx;
}
</style>
