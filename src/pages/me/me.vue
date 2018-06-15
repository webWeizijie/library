<template>
  <div class="container">
    <div class="user-info">
      <block v-if="user.hasLogin">
      <div class="user-avatar">
        <img :src="user.userInfo.avatarUrl" />
      </div>
      <div class="user-name">{{user.userInfo.nickName}}</div>
    </block>
    <button v-if="!user.hasLogin" class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="userLogin">一建登录</button>
    </div>

    <div class="content">
      <div :style="'transform:rotateZ('+ angle + 'deg)'" >
        <img class="wave" src="../../images/more/wave.png" mode="aspectFill" />
        <img class="wave wave-bg" src="../../images/more/wave.png" mode="aspectFill" />
      </div>
      <div class="content-box">
        <div class="progressbar-cont">
          <yearProgress></yearProgress>
        </div>
        <button class="add-book-btn" @click="scanCode">添加图书</button>
      </div>
    </div>
  </div>


</template>
<script>
import { mapGetters } from "vuex";
import { getUserInfo, request } from "../../utils/biz.js";
import YearProgress from "@/components/yearProgress/yearProgress";
import store from "../../store/index.js";

const app = getApp();
export default {
  data() {
    return {
      angle: 0
    };
  },
  created() {},
  onReady() {
    // wx.onAccelerometerChange((res) => {
    //   let angle = -(res.x * 30).toFixed(1);
    //   if (angle > 14) { angle = 14; }
    //   else if (angle < -14) { angle = -14; }
    //   if (this.angle !== angle) {
    //     this.angle = angle
    //   }
    // });
  },
  methods: {
    userLogin(e) {
      wx.showToast({
        title: "获取中",
        icon: "loading",
        duration: 2000
      });
      getUserInfo(e)
        .then(result => {
          wx.setStorage({
            key: "userInfo",
            data: result,
            success: function(res) {}
          });
          store.commit("setUserInfo", result);
          wx.hideToast();
        })
        .catch(err => {
          wx.hideToast();
          console.log(err);
        });
    },
    scanCode() {
      wx.scanCode({
        onlyFromCamera: true,
        success: res => {
          if (res.result) {
            console.log(res.result)
            this.addBook(res.result);
          }
        },
        fail: err => {
          console.log(err, "err");
        }
      });
    },
    async addBook(isbn) {
      wx.showLoading({
        title:'加载中'
      })
      const res = await request("POST", "/weapp/addbook", {
        isbn,
        openid: this.user.userInfo.openId
      });
      if (res.code === 0 && res.data.title) {
        wx.hideLoading()
        wx.showModal({
          title: "添加成功",
          content: `${res.data.title}添加成功`,
          showCancel:false,
          success: function(res) {

          }
        });
      } else {
        wx.hideLoading()
        wx.showModal({
          title: "添加失败",
          content: `${res.data.msg}`,
          showCancel:false,
          success: function(res) {

          }
        });
      }
    }
  },
  components: {
    YearProgress: YearProgress
  },
  computed: {
    user() {
      return store.state.user;
    }
  }
};
</script>
<style scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 750rpx;
  padding: 10rpx 0;
  background: #ea5149;
}
.user-info {
  height: 340rpx;
}
.login-btn {
  width: 260rpx;
  height: 84rpx;
  line-height: 84rpx;
  font-size: 35rpx;
  border: 3rpx solid #ea5149;
  color: #ea5149;
  background: #ffffff;
  margin: 84rpx auto;
}
.user-avatar {
  width: 150rpx;
  height: 150rpx;
  margin: 40rpx auto 22rpx auto;
  position: relative;
  z-index: 2;
  /* animation: sway 10s ease-in-out infinite; */
}
.user-avatar img {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.user-name {
  font-size: 32rpx;
  text-align: center;
  color: #ffffff;
}

@keyframes sway {
  0% {
    transform: translate3d(0, 20rpx, 0) rotate(-15deg);
  }

  17% {
    transform: translate3d(0, 0rpx, 0) rotate(25deg);
  }

  34% {
    transform: translate3d(0, -20rpx, 0) rotate(-20deg);
  }

  50% {
    transform: translate3d(0, -10rpx, 0) rotate(15deg);
  }

  67% {
    transform: translate3d(0, 10rpx, 0) rotate(-25deg);
  }

  84% {
    transform: translate3d(0, 15rpx, 0) rotate(15deg);
  }

  100% {
    transform: translate3d(0, 20rpx, 0) rotate(-15deg);
  }
}
.wave {
  position: absolute;
  z-index: 3;
  right: 0;
  top: -30rpx;
  opacity: 0.725;
  height: 260rpx;
  width: 2250rpx;
  animation: wave 10s linear infinite;
}

.wave-bg {
  z-index: 1;
  animation: wave-bg 9.75s linear infinite;
}

@keyframes wave {
  from {
    transform: translate3d(125rpx, 0, 0);
  }

  to {
    transform: translate3d(1125rpx, 0, 0);
  }
}

@keyframes wave-bg {
  from {
    transform: translate3d(375rpx, 0, 0);
  }

  to {
    transform: translate3d(1375rpx, 0, 0);
  }
}
.content {
  width: 750rpx;
  position: absolute;
  top: 340rpx;
  bottom: 0;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(244, 244, 244, 0)),
    color-stop(0.1, #f4f4f4),
    to(#f4f4f4)
  );
}
.add-book-btn {
  background: #ea5149;
  color: #ffffff;
  width: 640rpx;
  height: 80rpx;
  line-height: 80rpx;
  margin: 0 auto 20rpx auto;
  font-size: 32rpx;
}
.content-box {
  width: 750rpx;
  position: relative;
  z-index: 19;
}
.progressbar-cont {
  width: 640rpx;
  margin: 90rpx auto 70rpx auto;
}
</style>
