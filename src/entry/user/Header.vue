<template>
  <!-- 导航头部 -->
  <div class="header">
    <div class="header-inner">
      <div class="logo-wrap">
        <a href="#"><img src="../../assets/logo.png" class="bingyan-logo" alt="Bingyan Studio"/></a>
        <a href="#"><img src="../../assets/by_ideas_black.png" class="ued-logo" alt="Bingyan Ideas"/> </a>
      </div>
      <div class="mp-wrap">
        <router-link :to="{path: '/setting'}"><img v-bind:src="avatar" class="avatar" alt="砖栏头像" /></router-link>
        <router-link :to="{path: '/setting'}"><span class="name">{{ nickname }}</span></router-link> |
        <a href="/loginout" id="logout">退出</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatar: require('../../assets/logo.png'),
      nickname: '子矜'
    }
  },
  mounted () {
    this.f_get_usr_info()
  },
  methods: {
    f_get_usr_info: function () {
      this.$http.get('/api/user/info').then(function (response) {
        let body = response.body
        this.avatar = body.data.avatar
        this.nickname = body.data.nickname
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../scss/_varilables.scss";
$header-height: 60px;
.header{
  height:$header-height;
  position: fixed;
  top:0;
  left:0;
  width:100%;
  z-index:10;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.header-inner{
  width: 950px;
  margin:0 auto;
  position: relative;
}
//导航栏上的logo
.logo-wrap{
  height: $header-height;
  line-height: $header-height;
  text-align: center;
  display: inline-block;
  img{
    vertical-align: middle;
    &.bingyan-logo{
      height:40px;
    }
  }
}
.mp-wrap{
  float: right;
  height: $header-height;
  line-height: $header-height;
  .avatar{
    vertical-align: middle;
    margin-right: 4px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .name{
    margin-right: 6px;
    vertical-align: middle;
  }
  #logout{
    margin-left: 6px;
    font-size: 12px;
    color:#999;
    &:hover{
      color:$bingyan-color;
      text-decoration: underline;
    }
  }
}
</style>
