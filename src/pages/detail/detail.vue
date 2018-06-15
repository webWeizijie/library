<template>
  <div>
    <BookInfo :info="info" v-if="info != ''"></BookInfo>
    <CommonList :comments="comments" v-if="comments.length > 0"></CommonList>
    <textarea v-if="showAdd || !user.hasLogin" v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书短评">

    </textarea>
    <button v-if="!user.hasLogin" class="sumit-comment" open-type="getUserInfo" lang="zh_CN" @getuserinfo="userLogin">一建登录</button>
    <button v-if="user.hasLogin && showAdd" class="sumit-comment" @click="addComment" >提交</button>
    <div class="address flex-row" v-if="showAdd || !user.hasLogin">
      <div>地理位置</div>
      <switch class="switch" color="#Ea5a49" :checked='address' @change="getGeo"/>
      <div class="text-primary">{{address}}</div>
    </div>
    <div class="phone flex-row" v-if="showAdd || !user.hasLogin">
      <div>手机型号</div>
      <switch class="switch" color="#Ea5a49" :checked='phone' @change="getphone"/>
      <div class="text-primary">{{phone}}</div>
    </div>
  </div>
</template>
<script>
import { request, getUserInfo } from "@/utils/biz.js";
import BookInfo from "@/components/BookInfo/BookInfo";
import CommonList from "@/components/CommonList/CommonList";
import store from "../../store/index.js";

export default {
  data() {
    return {
      comments: [],
      comment: "",
      bookId: null,
      info: "",
      address: "",
      phone: "",
      result: {}
    };
  },
  onShareAppMessage() {},
  created() {},
  mounted() {
    this.bookId = this.$root.$mp.query.id;
    this.getDetail();
    this.getCommentsList();
  },
  methods: {
    async getDetail() {
      const info = await request("GET", "/weapp/bookdetail", {
        id: this.bookId
      });
      this.info = info.data;
      wx.setNavigationBarTitle({
        title: this.info.title
      });
    },
    async getCommentsList() {
      const comments = await request("GET", "/weapp/commentlist", {
        bookid: this.bookId
      });

      if (comments.code == 0) {
        this.comments = comments.data.list;
      }
      console.log(comments, "comments");
    },
    userLogin(e) {
      wx.showToast({
        title: "获取中",
        icon: "loading"
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
    async addComment() {
      if (!this.user.hasLogin) {
        return;
      } else {
        wx.showLoading({
          title: "发表中"
        });
      }

      const data = {
        comment: this.comment,
        phone: this.phone,
        address: this.address,
        bookId: this.bookId,
        openId: this.user.userInfo.openId
      };

      const state = await request("POST", "/weapp/addComment", data);
      if (state.code === 0) {
        wx.showToast({
          title: "发表成功",
          icon: "success"
        });
      } else {
        wx.showToast({
          title: "发表失败",
          icon: "loading"
        });
      }

      wx.hideLoading();
      this.comment = "";
      this.getCommentsList();
    },
    getphone(e) {
      if (e.target.value) {
        const phone = wx.getSystemInfoSync();

        this.phone = phone.model;
      } else {
        this.phone = "";
      }
    },
    getGeo() {
      wx.showLoading({
        title: "加载中"
      });
      const that = this;
      const ak = "NAOmO2MgZA8pEbcLTHBHCpRGCwmZqAQe";
      const url = `http://api.map.baidu.com/geocoder/v2/`;

      let latitude = 0;
      let longitude = 0;
      wx.getLocation({
        success(geo) {
          latitude = geo.latitude;
          longitude = geo.longitude;

          wx.request({
            url: url,
            data: {
              location: `${geo.latitude},${geo.longitude}`,
              output: "json",
              ak: ak
            },
            method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
              if (res.statusCode == 200 && res.data.status == 0) {
                that.location = res.data.result;
                that.address = res.data.result.addressComponent.city;
              }
              wx.hideLoading();
            },
            fail: function(err) {
              that.address = "未知地点";
              wx.hideLoading();
            }
          });
        },
        fail() {
          that.address = "未知地点";
          wx.hideLoading();
        }
      });
    }
  },
  components: {
    BookInfo: BookInfo,
    CommonList: CommonList
  },
  computed: {
    user() {
      return store.state.user;
    },
    showAdd() {
      if (!this.user.hasLogin) {
        return false;
      }
      if (
        this.comments.filter(v => {
          return v.openid == this.user.userInfo.openId;
        }).length
      ) {
        return false;
      }
      return true;
    }
  }
};
</script>
<style>
.textarea {
  width: 650rpx;
  margin: 30rpx;
  padding: 20rpx;
  height: 200rpx;
  font-size: 30rpx;
  background: #f2f3f4;
  border-radius: 10rpx;
}
.address,
.phone {
  align-items: center;
  padding: 20rpx 30rpx;
  font-size: 28rpx;
}
.switch {
  margin: 0 14rpx;
}
.sumit-comment {
  width: 690rpx;
  height: 78rpx;
  line-height: 78rpx;
  font-size: 34rpx;
  margin: 0 auto 20rpx auto;
  background: #EA5149;
  color: #ffffff;
}
</style>
