<template lang="html">
  <div class="nav-wrap">
      <div class="nav-display">
          <!-- <img src="../assets/slogan.png" alt="导航展示"/> -->
          <p class="slogan">做高校最好的互联网团队博客</p>
      </div>
      <div class="menu">
        <router-link :to="{ path: '/category/all'}" class="nav">
          <span class="zh_cn">首页</span> <span class="us_en">HOME</span>
        </router-link>
        <router-link :to="{ path: '/category/pm'}" class="nav">
          <span class="zh_cn">产品</span> <span class="us_en">PM</span>
        </router-link>
        <router-link :to="{ path: '/category/vd'}" class="nav">
          <span class="zh_cn">设计</span> <span class="us_en">VD</span>
        </router-link>
        <router-link :to="{ path: '/category/id'}" class="nav">
          <span class="zh_cn">交互</span> <span class="us_en">ID</span>
        </router-link>
        <router-link :to="{ path: '/category/fe'}" class="nav">
          <span class="zh_cn">前端</span> <span class="us_en">FE</span>
        </router-link>
        <router-link :to="{ path: '/category/rd'}" class="nav">
          <span class="zh_cn">研发</span> <span class="us_en">RD</span>
        </router-link>
        <router-link :to="{ path: '/category/op'}" class="nav">
          <span class="zh_cn">运营</span> <span class="us_en">OP</span>
        </router-link>
        <!-- <a href="https://www.bingyan.net" target="_blank" class="nav">
          <span class="zh_cn">关于我们</span><span class="us_en">ABOUT US</span>
        </a> -->
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {},
  ready () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss">
@import "../scss/_mixin.scss";
$width: 220px;
.nav-wrap{
  position: fixed;
  width: $width;
  z-index: 0;
  .nav{
    @include transition-ease;
    display: block;
    border-right: 4px solid #f8f9fb;
    text-align: center;
    color: #333;
    height:40px;
    line-height: 40px;
    &.active,&.router-link-active,&:hover{
      border-right-color:#000;
      background-color: #ffffff;
    }
  }
}
.nav-display{
  text-align:center;
  padding-top:50px;
  height:150px;
  -webkit-transition:opacity 0.2s ease 0.5s;
  -moz-transition:opacity 0.2s ease 0.5s;
  transition:opacity 0.2s ease 0.5s;

  background: {
    image:url("../assets/slogan.png");
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
    width: $width;
    text-align: center;
    color:#999;
  }
}
</style>
