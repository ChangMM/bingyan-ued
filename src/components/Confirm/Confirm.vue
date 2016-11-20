<template>
  <div class="confirm-mask" transition='confirmIn'>
    <div class="confirm-wrap">
      <div class="confirm-header">
        请确认操作
        <div class="line"></div>
        <!-- <img src="../../assets/close.png" class="close" v-on:click='f_close' /> -->
      </div>
      <div class="button-wrap txt-center">
        <span class='button cancel-button' v-on:click='f_cancel'>取消</span>
        <span class='button confirm-button' v-on:click='f_confirm'>确认</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
@import '../../scss/_varilables.scss';
// @import '../../scss/componments/_button.scss';
.confirm-mask{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: 9998;
  transition: background ease .6s;
  background: rgba(255, 255, 255, 0.9);
}
.confirm-wrap{
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding:20px 60px 40px 60px;
  border-radius: 2px;
  width:360px;
  background-color: #fff;
  box-shadow: 1px 1px 20px rgba(0,0,0,0.05),
              -1px -1px 20px rgba(0,0,0,0.05);
}
.confirm-header{
  padding:10px 0;
  font-size:16px;
  font-weight: bolder;
  position:relative;
  .line{
    margin-top: 10px;
    width:140px;
    height:6px;
    background-color: $bingyan-color;
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
.button-wrap{
  margin-top: 30px;
}
.button{
  display: inline-block;
  width:120px;
  height:36px;
  line-height: 36px;
  border: 1px solid #ff6c74;
  cursor: pointer;
  &.confirm-button{
    color:#fff;
    background-color: #ff6c74;
    &:hover{
      background-color: darken(#ff6c74,5%);
    }
  }
  &.cancel-button{
    color:#ff6c74;
    background-color: #fff;
    margin-right: 80px;
    &:hover{
      color:#fff;
      background-color: darken(#ff6c74,5%);
    }
  }
}
.confirmIn-transition{
  transition: all .2s ease;
}
.confirmIn-transition .confirm-wrap{
  transition: all .2s ease;
}
.confirmIn-enter, .confirmIn-leave {
  opacity: 0;
}
.confirmIn-enter .confirm-wrap, .confirmIn-leave .confirm-wrap{
  transform:translate(-50%, -50%) scale(1.1);
}
</style>
