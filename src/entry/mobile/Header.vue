<template>
  <!-- 导航头部 -->
  <div class="header">
    <div class="logo">
      <a href="#"><img src="../../assets/logo.png" class="bingyan-logo" alt="Bingyan Studio"/></a>
      <a href="#"><img src="../../assets/by_ideas_white.png" class="ued-logo" alt="Bingyan Ideas"/> </a>
    </div>
    <div id='nav-toggle' :class="['nav-toggle', {'toggle-animate': m_open_nav}]" v-on:click='f_open_nav($event)'>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div :class="['nav-wrap', {'open': m_open_nav}]" id="nav-wrap">
      <div class="nav-display">
          <p class="slogan">做高校最好的互联网团队博客</p>
      </div>
      <div class="menu">
        <span class="nav" v-on:click ='f_go("all")'>
          <span class="zh_cn">首页</span> <span class="us_en">HOME</span>
        </span>
        <span class="nav" v-on:click ='f_go("pm")'>
          <span class="zh_cn">产品</span> <span class="us_en">PM</span>
        </span>
        <span class="nav" v-on:click ='f_go("vd")'>
          <span class="zh_cn">设计</span> <span class="us_en">VD</span>
        </span>
        <span class="nav" v-on:click ='f_go("id")'>
          <span class="zh_cn">交互</span> <span class="us_en">ID</span>
        </span>
        <span class="nav" v-on:click ='f_go("fe")'>
          <span class="zh_cn">前端</span> <span class="us_en">FE</span>
        </span>
        <span class="nav" v-on:click ='f_go("rd")'>
          <span class="zh_cn">研发</span> <span class="us_en">RD</span>
        </span>
        <a class="nav" href="http://www.bingyan.net" target='_blank'>
          <span class="zh_cn">关于我们</span><span class="us_en">ABOUT US</span>
        </a>
        <p class='contact'>
          <a href="https://github.com/ChangMM" target="_blank" class="icon-github iconfont"></a>
          <a href="http://weibo.com/bingyanhust" target="_blank" class="icon-weibo1 iconfont"></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_open_nav: false
    }
  },
  methods: {
    f_open_nav: function (e) {
      let currentTarget = e.currentTarget
      if (currentTarget.classList.contains('toggle-animate')) {
        this.m_open_nav = false
      } else {
        this.m_open_nav = true
      }
    },
    f_close_nav: function () {
      this.m_open_nav = false
    },
    f_go: function (path) {
      this.$router.push('/category/' + path)
      this.f_close_nav()
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../scss/_varilables.scss";
@import "../../scss/_mixin.scss";
$header-height: 50px;
.header{
  background-color: #000;
  height:$header-height;
  position: fixed;
  top:0;
  left:0;
  width:100%;
  z-index:10;
}
.nav-toggle {
  position: absolute;
  right: 10px;
  padding: 10px;
  background-image: none;
  border-radius: 4px;
  top: 8px;
  border: 0;
  cursor: pointer;
  display: block;
  z-index: 999;
  span {
    display: block;
    width: 20px;
    height: 2px;
    margin-bottom: 5px;
    position: relative;
    background: #cdcdcd;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 20px;
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), background 0.5s cubic-bezier(0.77,0.2,0.05,1.0), opacity 0.55s ease, -webkit-transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
  }
  &.toggle-animate span{
    opacity: 1;
    transform: rotate(45deg);
    &:nth-last-child(2){
      opacity: 0;
    }
    &:nth-last-child(3){
      opacity: 1;
      transform: rotate(-45deg);
    }
  }
}
//导航栏上的logo
.logo{
  height: $header-height;
  line-height: $header-height;
  text-align: center;
  display: inline-block;
  padding-left: 6px;
  img{
    vertical-align: middle;
    &.bingyan-logo{
      height:30px;
    }
  }
}
.nav-wrap{
  background-color: #333;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding:40px 20px 10px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99;
  transform:translate(300px,0);
  box-sizing: border-box;
  transition:transform 430ms cubic-bezier(0.3,0,0,1);
  &.open{
    transform: translate(0,0);
    transition:transform 430ms cubic-bezier(0.3,0,0,1);
  }
  .nav{
    display: block;
    text-align: center;
    cursor: pointer;
    color: #fff;
    height:40px;
    line-height: 40px;
    &.active,&.router-link-active,&:hover{
      background-color: #ffffff;
      color: #000;
    }
  }
  .nav-display{
    width:240px;
    text-align:center;
    padding-top:50px;
    height:150px;
    background: {
      image:url("../../assets/slogan.png");
      repeat: no-repeat;
      position: 50% 50px;
    }
    position: relative;
    .slogan{
      position: absolute;
      bottom:25px;
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      width: 240px;
      text-align: center;
      color:#999;
    }
  }
  .contact{
    text-align: center;
    color: #fff;
    height:40px;
    .iconfont{
      font-size: 22px;
    }
  }
}
</style>
