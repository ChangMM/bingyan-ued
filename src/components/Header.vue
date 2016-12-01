<template>
  <!-- 导航头部 -->
  <div class="header">
      <div class="header-inner">
          <div class="logo">
              <a href="#"><img src="../assets/logo.png" class="bingyan-logo" alt="Bingyan Studio"/></a>
              <a href="#"><img src="../assets/by_ideas_white.png" class="ued-logo" alt="Bingyan Ideas"/> </a>
          </div>
          <div class="search-wrap" v-on:keyup.enter='f_search(m_keyword)'>
              <input type="text" class="search" name="key_word" v-model="m_keyword" autocomplete="off" placeholder="文章名/作者名"/>
              <span class="icon iconfont icon-icons01" id="search" v-on:click="f_search(m_keyword)" ></span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_keyword: ''
    }
  },
  methods: {
    f_search: function (keyword) {
      if (keyword.trim() === '') {
        return this.$warn('关键字不能为空')
      }
      this.$router.push('/search/' + keyword)
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../scss/_varilables.scss";
@import "../scss/_mixin.scss";
$header-height: 60px;
.header{
  background-color: #000;
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
$search-height: 36px;
//导航栏的搜索框
.search-wrap{
  height: $search-height;
  line-height: $search-height;
  position:absolute;
  top:12px;
  right:0;
  background-color: transparent;
  padding-right: 40px;
  .search{
    height: $search-height;
    line-height: $search-height;
    border:none;
    outline:none;
    width:200px;
    font-size: 12px;
    padding-left: 8px;
    color: #666;
    background-color: #fff;
    border-top-left-radius:2px;
    border-bottom-left-radius:2px;
    @include transition-ease;
    &:focus{
      box-shadow:inset 1px 1px 1px $bingyan-color,inset -1px -1px 1px $bingyan-color;
    }
  }
  .icon{
    position: absolute;
    // 不太明白为什么会有1px的误差
    top:1px;
    right:0;
    line-height:$search-height;
    height: $search-height;
    width: 40px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    color: #fff;
    background-color: $bingyan-color;
    &:hover{
      background-color: darken($bingyan-color, 10%);
    }
    &:active{
      background-color: darken($bingyan-color, 20%);
    }
    border-top-right-radius:2px;
    border-bottom-right-radius:2px;
  }
}
</style>
