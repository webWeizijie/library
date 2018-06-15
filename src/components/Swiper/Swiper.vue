<template>
  <div class="swiper">
    <swiper :indicator-dots='true' indicator-color='#EA5A49' :autoplay="true" :interval="6000" :duration="100" :circular="true">
          <swiper-item :key="idx" v-for="(item,idx) in imgUrls">
            <img @click='bookDetail(img)' v-for='img in item' :key='img' :src="img.image" class="slide-image" mode="aspectFit"/>
          </swiper-item>
      </swiper>
  </div>
</template>
<script>
export default {
  props: ["tops"],
  computed:{
    imgUrls(){
      let res = this.tops
      return [res.slice(0,3),res.slice(3,6),res.slice(6,9)]
    }
  },
  data() {
    return {};
  },
  methods: {
    bookDetail(item){
      wx.navigateTo({
        url:'/pages/detail/main?id=' + item.id
      })
    }
  }
};
</script>
<style>
.swiper{
  margin-top: 5rpx;
}
.slide-image{
  width: 33%;
  height: 250rpx;
}
</style>
