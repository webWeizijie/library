<template>
  <div class="book-info">
    <div class="thumb">
      <img class="back" :src="info.image" mode='aspectFill'>
      <img class="img" :src="info.image" mode='aspectFit'>
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="owner flex-row">
      <div class="user-info">
        <img class="avatar" :src="info.user_Info.avatar" alt="" mode='widthFix'>
        <span>{{info.user_Info.nickName}}</span>
      </div>
      <div class="right text-primay">
        {{info.rate}}分
        <Rate :value='info.rate'></Rate>
      </div>
    </div>
    <div class="detail flex-row">
      <div>
        {{info.publisher}}
      </div>
      <div class="right">
        {{info.price}}
      </div>
    </div>
    <div class="tags">
        <div :key='item' class="badge" v-for='item in info.tags'>
          {{item}}
        </div>
    </div>
    <div class="summary">
      <div :key='i' v-for='(item,i) in info.summary'>
          {{item}}
        </div>
    </div>
  </div>
</template>
<script>
import Rate from "@/components/Rate/Rate";
export default {
  props: ["info"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.info);
  },
  components: {
    Rate: Rate
  },
  created(){

  }
};
</script>
<style scoped>
.book-info {
}
.book-info .thumb {
  width: 750rpx;
  height: 500rpx;
  overflow: hidden;
  position: relative;
}
.book-info .thumb .back {
  filter: blur(25px);
  width: 100%;
}
.book-info .thumb .img {
  position: absolute;
  height: 300rpx;
  left: 0;
  top: 50rpx;
  width: 100%;
}
.book-info .thumb .info {
  color: #fff;
  position: absolute;
  width: 100%;
  left: 0;
  top: 350rpx;
  text-align: center;
}
.book-info .thumb .info .title {
  font-size: 36rpx;
  margin-top: 20rpx;
}
.book-info .thumb .info .author {
  font-size: 28rpx;
}
.owner,
.detail {
  font-size: 28rpx;
  padding: 30rpx 30rpx 0 30rpx;
  justify-content: space-between;
}
.user-info .avatar {
  vertical-align: middle;
  margin-right: 20rpx;
  align-items: center;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  overflow: hidden;
}
.summary{
  text-indent: 2em;
  line-height: 50rpx;
}
.summary,.tags{
  padding: 30rpx;
  font-size: 28rpx;
}
.badge{
  display: inline-block;
  margin: 10rpx;
  border-radius: 6px;
  border: 1px #EA5A49 solid;
  color: #EA5A49;
  padding: 5rpx 10rpx;
}
</style>
