<template>
<div class="rate">
  <span class="text-primay">☆☆☆☆☆</span>
  <div class="hollow text-primay" :style="style">★★★★★</div>
</div>
</template>
<script>
export default {
  props:{
    value:{
      type:[String,Number],
      default:0
    }
  },
  data(){
    return {

    }
  },
  methods:{

  },
  computed:{
    style(){
      return `width:${this.value / 2}em`
    }
  }
};
</script>
<style>
.rate{
  position: relative;
  display: inline-block;
  font-size: 28rpx;
}
.rate .hollow{
  color: #EA5149;
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
