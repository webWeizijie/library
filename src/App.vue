
<script>
import store from "./store/index.js";
import qcloud from 'wafer2-client-sdk'
import {config} from './utils/biz.js'

export default {
  globalData: {
    name: "wei"
  },
  created() {
    qcloud.setLoginUrl(config.login)
    store.commit("initUserInfo");
  },
  methods: {}
};
</script>

<style>
view,
text,
button {
  font-family: "pingfang SC";
}
button {
  margin: 0;
  padding: 0;
  border: 0;
}
.text-bottom{
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  color: #cccccc;
  text-align: center;
}
.text-primay{
  color: #EA5149;
}
.flex-row{
  display: flex;
  flex-direction: row;
}
</style>
