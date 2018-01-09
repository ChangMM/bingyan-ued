<template>
  <div id="app">
    <!-- 用来做高斯模糊的背景层 -->
    <!-- <div class="bg-wrap"></div> -->
    <router-view/>
    <div class="footer">
      <a href="https://weibo.com/u/3897687414" target="_blank"><img class="weibo" src="/static/img/weibo.png" alt=""></a>
      <router-link class="about" :to="{ name: 'About'}">关于这个</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
html,body{
  background-color: #f2f2f2;
  height: 100%;
}
a{
  text-decoration: none;
  color: inherit;
}
#app {
  height: 100%;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  position: relative;
  box-sizing: border-box;
  font-family:"PingFangSC-Regular", "Helvetica Neue", Helvetica, "Lantinghei SC", SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .footer{
    height: 30px;
    line-height: 30px;
    left:0;
    right:0;
    bottom:0;
    position: absolute;
    text-align: center;
    .about{
      font-size: 12px;
      color: #666;
    }
    .weibo{
      height: 16px;
      vertical-align: middle;
      margin-right: 6px;
    }
  }
}
.bg-wrap{
  position: absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
  z-index: -1;
  background: url('/static/img/bg_1.jpg') center center;
  background-size: cover;
  filter: blur(2px);
}
</style>
