<template lang="html">
  <div class="article-mask" transition="withdrawPanelIn">
    <div class="choose-wrap">
      <div class="choose-header">
        个人介绍及作品修改
        <div class="line"></div>
        <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
      </div>
      <div class="search-wrap clearfix">
        <textarea name="name" class="intro" v-model="content"></textarea>
        <span class="num-tip">{{content.length}}/252</span>
      </div>
      <div class="release-button-wrap txt-center">
        <span class='button release-button' v-on:click='f_alter_works(content)'>确认修改</span>
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
  props: ['show', 'content', 'refresh'],
  methods: {
    f_close: function () {
      this.show = false
    },
    f_alter_works: function (works) {
      if (works.trim().length === 0) {
        return this.$warn('个人介绍及作品长度不能为空')
      }
      if (works.trim().length > 252) {
        return this.$warn('个人介绍及作品过长')
      }
      this.$confirm().then(function () {
        this.$http.post('/api/user/works', {
          csrf: this.$cookies()['csrf'] || '',
          works: works
        }).then((response) => {
          let body = response.body
          if (body.error === 'ok') {
            this.$warn('修改成功', function () {
              this.f_close()
              this.refresh()
            }.bind(this))
          } else {
            this.$warn('修改失败，请重试')
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
    width:160px;
    height:6px;
    background-color: $main-color;
  }
  .close{
    position: absolute;
    top:0;
    right:-30px;
    height:20px;
    cursor: pointer;
  }
}
.search-wrap{
  margin-top:10px;
  position: relative;
  textarea{
    height:120px;
    width:100%;
    padding:5px;
    outline:none;
    border:1px solid #ddd;
    border-radius: 2px;
    resize: none;
    &:focus{
      border-color: $main-color;
    }
  }
  .num-tip{
    position: absolute;
    bottom: 8px;
    right: -6px;
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
