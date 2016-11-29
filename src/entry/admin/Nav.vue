<template lang="html">
  <div class="menu-wrap">
    <dl class="menu">
      <dt class="menu-title">文章管理</dt>
      <dd class="menu-item"><router-link :to="{path: '/released'}">已发布</router-link></dd>
      <dd class="menu-item"><router-link :to="{path: '/checking'}">审核中</router-link></dd>
      <dd class="menu-item"><router-link :to="{path: '/rejected'}">已拒绝</router-link></dd>
    </dl>
    <dl class="menu">
      <dt class="menu-title">评论管理</dt>
      <dd class="menu-item"><router-link :to="{path: '/setting'}">所有评论</router-link></dd>
    </dl>
    <dl class="menu">
      <dt class="menu-title">人员管理</dt>
      <dd class="menu-item"><router-link :to="{path: '/setting'}">所有人员</router-link></dd>
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
