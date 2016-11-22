<template>
  <transition appear>
    <div class="pop-panel-mask">
      <div class="pop-panel-wrap">
        <div class="pop-panel-header">
          请确认操作
          <div class="line"></div>
        </div>
        <div class="button-wrap">
          <span class='button hollow' v-on:click='f_cancel'>取消</span>
          <span class='button solid' v-on:click='f_confirm'>确认</span>
        </div>
      </div>
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
@import "../../scss/components/_pop_panel.scss";
</style>
