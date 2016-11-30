<template lang="html">
  <transition appear>
    <div class="pop-panel-mask">
      <div class="pop-panel-wrap">
        <div class="pop-panel-header">
          个人主页修改
          <div class="line"></div>
          <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
        </div>
        <div class="main-panel clearfix">
          <input type="text" class="search-input" v-model="content">
        </div>
        <div class="button-wrap">
          <span class='button solid' v-on:click = 'f_alter_price(content)'>确认修改</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['content', 'refresh'],
  methods: {
    f_close: function () {
      this.$emit('close')
    },
    f_alter_price: function (homepage) {
      this.$confirm().then(function () {
        this.$http.post('api/user/homepage', {
          homepage: homepage
        }).then((response) => {
          let body = response.body
          if (body.status === 1) {
            this.$warn('个人主页修改成功', function () {
              this.f_close()
              this.refresh()
            }.bind(this))
          } else {
            this.$warn(body.msg)
          }
        })
      }.bind(this))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../scss/components/_pop_panel.scss';
.main-panel{
  margin-top:10px;
  .search-input{
    height:36px;
    border:1px solid #ddd;
    outline:none;
    width:300px;
    padding-left: 5px;
    padding-right: 40px;
    font-size: 14px;
    border-radius: 2px;
    &:focus{
      border-color: $bingyan-color;
    }
  }
}
</style>
