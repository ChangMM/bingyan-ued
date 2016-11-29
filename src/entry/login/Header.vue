<template>
  <!-- 导航头部 -->
  <div class="header">
      <div class="header-inner">
          <div class="logo">
              <a href="#"><img src="../../assets/logo.png" class="bingyan-logo" alt="Bingyan Studio"/></a>
              <a href="#"><img src="../../assets/by_ideas_white.png" class="ued-logo" alt="Bingyan Ideas"/> </a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_nickname: '',
      m_avatar: ''
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
}
.header-inner{
  width: 950px;
  margin:0 auto;
  position: relative;
}
//导航栏上的logo
.logo{
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
</style>
