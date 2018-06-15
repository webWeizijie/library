<template>
  <div class="comment-list">
    <div class="page-title">
      我的评论
    </div>
    <div class="comment" v-for='comment in comments' :key='comment.id' @click="handleChange(comment)">
      <div class="user">
        <div class="inline">
          <img :src="comment.image" class="avatar" mode='aspectFit'>
          {{comment.title}}
        </div>
        <div class="right">
          {{comment.address || '未知地点'}}
          <span>--</span>
          {{comment.phone || '未知型号'}}
        </div>
      </div>
      <div class="content">{{comment.comment}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["comments","type"],
  methods:{
    handleChange(item){
      console.log(item)
      if(this.type == 'user'){
        wx.navigateTo({
          url: '/pages/detail/main?id=' + item.bookid,
          success: function(res){
            // success
          }
        })
      }
    }
  }
};
</script>
<style scoped>
.page-title{
  font-size: 36rpx;
  margin-bottom: 40rpx;
}
.comment-list {
  padding: 10rpx 30rpx;
  font-size: 14px;
}
.comment-list .comment {
  background: #fff;
  margin-bottom: 10px;
}
.comment-list .content {
  padding: 8px 0;
  font-size: 32rpx;
  border-bottom:1rpx solid #f2f3f4;
  word-break:break-all;
}
.comment{
  padding-bottom: 8rpx;
}
.comment .right{
  float: right;
  font-size: 24rpx;
}
.inline{
  display: inline-block;
}
.user {
}
.user .avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
