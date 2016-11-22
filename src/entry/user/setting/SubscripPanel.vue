<template lang="html">
  <div class="article-mask" transition="withdrawPanelIn">
    <div class="choose-wrap">
      <div class="choose-header">
        订阅价格修改
        <div class="line"></div>
        <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
      </div>
      <div class="search-wrap clearfix">
        <input type="text" class="search-input" v-model="content">
        <p class="tip">订阅价格一年之中只能修改一次</p>
      </div>
      <div class="release-button-wrap txt-center">
        <span class='button release-button' v-on:click = 'f_alter_price(content)'>确认修改</span>
      </div>
    </div>
  </div>
</template>

<script>
/*global location:true */
export default {
  data () {
    return {
    }
  },
  props: ['show', 'content', 'refresh'],
  methods: {
    f_close: function () {
      this.show = false
    },
    f_alter_price: function (price) {
      this.$confirm().then(function () {
        this.$http.post('api/subsprice', {
          csrf: this.$cookies()['csrf'] || '',
          price: price * 100
        }).then((response) => {
          let body = response.body
          if (body.error === 'ok') {
            this.$warn('订阅价格修改成功', function () {
              this.f_close()
              // this.refresh()
              location.reload()
            }.bind(this))
          } else if (body.error === 'update:too_often') {
            this.$warn('一年之后方可重新修改订阅价格')
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
@import '../../../scss/base/_variable.scss';
@import '../../../scss/componments/_button.scss';
.article-mask{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: 9997;
  transition: background ease .6s;
  background: rgba(255, 255, 255, 0.9);
}
.choose-wrap{
  position: absolute;
  top:40%;
  left:50%;
  transform:translate(-50%, -50%);
  padding:30px 60px;
  border-radius: 2px;
  width:500px;
  background-color: #fff;
  box-shadow: 1px 1px 20px rgba(0,0,0,0.05),
              -1px -1px 20px rgba(0,0,0,0.05);
}
.choose-header{
  padding:10px 0;
  font-size:16px;
  font-weight: bolder;
  position:relative;
  .line{
    margin-top: 16px;
    width:100px;
    height:6px;
    background-color: $main-color;
  }
  .close{
    position: absolute;
    top:0;
    right:-30px;
    height:20px;
    cursor: pointer;
    transition: transform ease 0.4s;
    &:hover{
    }
  }
}
.search-wrap{
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
      border-color: #ff6c74;
    }
  }
  .tip{
    font-size: 12px;
    color: #666;
    margin-top: 10px;
  }
}
.release-button-wrap{
  margin-top: 30px;
}
.button{
  display: inline-block;
  width:120px;
  height:36px;
  line-height: 36px;
  border: 1px solid #ff6c74;
  cursor: pointer;
  color:#fff;
  background-color: #ff6c74;
  &:hover{
    background-color: darken(#ff6c74,5%);
  }
}
.withdrawPanelIn-transition{
  transition: all .2s ease;
}
.withdrawPanelIn-transition .choose-wrap{
  transition: all .2s ease;
}
.withdrawPanelIn-enter, .withdrawPanelIn-leave {
  opacity: 0;
}
.withdrawPanelIn-enter .choose-wrap, .withdrawPanelIn-leave .choose-wrap{
  transform:translate(-50%, -50%) scale(1.1);
}
</style>
