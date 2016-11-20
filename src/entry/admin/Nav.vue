<template lang="html">
  <div class="menu-wrap">
    <dl class="menu">
      <dt class="menu-title">内容管理</dt>
      <dd class="menu-item"><router-link :to="{path: '/released'}">发布的作品</router-link></dd>
      <dd class="menu-item"><router-link :to="{path: '/articles'}">作品库</router-link></dd>
    </dl>
    <dl class="menu">
      <dt class="menu-title">设置</dt>
      <dd class="menu-item"><router-link :to="{path: '/setting'}">账号设置</router-link></dd>
      <!-- <dd class="menu-item new"><a href="#">订阅设置</a></dd> -->
      <!-- <dd class="menu-item"><a href="#">收益提现</a></dd> -->
    </dl>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "../../scss/_varilables.scss";
.menu-wrap{
  padding-right:20px;
}
.menu{
  .menu-title{
    height: 40px;
    line-height: 40px;
    color:#999;
  }
  .menu-item{
    position: relative;
    padding-left: 25px;
    height: 40px;
    line-height: 40px;
    &.new:after{
      position: absolute;
      content: " ";
      top:17px;
      right:3px;
      height:6px;
      width:6px;
      border-radius: 50%;
      background-color:$bingyan-color;
    }
    a{
      &:hover,&.router-link-active{
        color:$bingyan-color;
      }
    }
  }
  border-bottom: 1px solid #ddd;
  &:last-child{
    border-bottom: none;
  }
}
</style>
