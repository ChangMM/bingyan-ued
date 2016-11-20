<template lang="html">
  <div class="copyright-wrap" id="copyright-wrap">
    <div class="copyright">
      Copyright © {{m_year}} 冰岩作坊. All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_year: (new Date().getYear() + 1900 - 2015 > 0) ? '2015-' + (new Date().getYear() + 1900) : 2015
    }
  }
}
</script>

<style lang="scss" scoped>
.copyright{
  width:100%;
  color:#999;
  font-size: 12px;
  text-align: center;
  position: absolute;
  bottom:14px;
}
</style>
