<template lang="html">
  <div class="article-mask" transition="withdrawPanelIn">
    <div class="choose-wrap">
      <div class="choose-header">
        提现金额
        <div class="line"></div>
        <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
      </div>
      <div class="search-wrap clearfix">
        <input type="text" class="search-input" v-model="m_input" placeholder="默认金额为500元">
        <p class="tip">提现将以微信红包或转账的方式发送到您的账户，请注意查收</p>
      </div>
      <div class="release-button-wrap txt-center">
        <span class='button release-button'>确认提现</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_input: ''
    }
  },
  props: ['show'],
  methods: {
    f_close: function () {
      this.show = false
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
  width:400px;
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
