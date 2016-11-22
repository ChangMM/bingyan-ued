<template>
  <transition appear  v-on:after-appear="afterEnter">
    <div class="warn-wrap" >
      <p class="msg-wrap">{{ msg }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang='scss' scoped>
.warn-wrap{
  position: fixed;
  width:400px;
  left:0;
  right:0;
  margin:auto;
  top:0;
  z-index: 9999;
  text-align: center;
  .msg-wrap{
    display: inline-block;
    padding:0 20px;
    border-radius: 1px;
    line-height: 36px;
    height:36px;
    background-color:red;
    font-size:14px;
    color: #fff;
  }
}
/* 必需 */
.v-enter-active, .v-leave{
  transition: top .3s ease;
  top:0;
}
.v-enter, .v-leave-active{
  top:-120px
}
</style>
