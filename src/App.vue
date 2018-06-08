
<script>
import store from './store/index.js'
export default {
  globalData:{
    name:'wei'
  },
  created() {
    store.commit('initUserInfo')
  },
  methods:{

  }
};
</script>

<style>
view,text,button{
  font-family: 'pingfang SC'
}
button{
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
