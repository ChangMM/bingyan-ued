<template lang="html">
  <transition appear>
    <div class="pop-panel-mask">
      <div class="pop-panel-wrap">
        <div class="pop-panel-header">
          头像修改
          <div class="line"></div>
          <img src="../../../assets/close.png" v-on:click='f_close' class="close" />
        </div>
        <div class="main-panel">
          <div class="input-avatar-wrap">
            <input type="file" v-on:change="f_avatar" class="file-input" name="avatar">
            <img v-bind:src="content" v-bind:style="avatarStyle" />
          </div>
          <p class="tip">点击头像上传新的小于2M的jpg、png、jpeg或者gif图片</p>
        </div>
        <div class="button-wrap">
          <span class='button solid' v-on:click='f_alter_avatar'>确认修改</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* global FormData:true */
export default {
  data () {
    return {
    }
  },
  props: ['content', 'refresh', 'avatarStyle'],
  methods: {
    f_close: function () {
      this.$emit('close')
    },
    f_avatar: function (event) {
      let file = event.target.files[0]
      if (['gif', 'jpg', 'jpeg', 'png'].indexOf(file.type.split('/')[1].toLowerCase()) === -1) {
        return this.$warn('图片格式不对')
      }
      if (file.size / 1024 > 2048) {
        return this.$warn('图片大小过大')
      }
      this.$warn('图片上传中')
      // 上传图片
      this.f_upload_avatar(file).then((response) => {
        let body = response.body
        if (body.status === 1) {
          this.content = body.data
        } else {
          this.$warn('图片上传失败')
        }
      })
    },
    f_alter_avatar: function () {
      this.$confirm().then(function () {
        this.$http.post('/api/user/avatar', {
          avatar: this.content
        }).then((response) => {
          let body = response.body
          if (body.status === 1) {
            this.$warn('修改成功', function () {
              this.f_close()
              this.refresh()
            }.bind(this))
          } else {
            this.$warn('修改失败，请重试')
          }
        })
      }.bind(this))
    },
    // 上传图片的函数
    f_upload_avatar: function (data) {
      var formData = new FormData()
      formData.append('upload_file', data)
      formData.append('ratio', 1)
      return this.$http.post('/api/upload', formData)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../scss/components/_pop_panel.scss';
.main-panel{
  margin-top:10px;
  text-align: center;
  .tip{
    font-size: 12px;
    color: #666;
    margin-top: 10px;
  }
  .input-avatar-wrap{
    display: inline-block;
    vertical-align: middle;
    background-color: #eee;
    width:100px;
    height:100px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    // 解决一个bug http://stackoverflow.com/questions/27296900/webkit-overflow-issue-on-border-radius-and-transform
    -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
    input{
      cursor: pointer;
      opacity: 0;
      position: absolute;
      z-index: 1;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    img{
      position: absolute;
      top:50%;
      left:50%;
      height:100%;
      width:100%;
      transform: translate3d(-50%,-50%,0);
      z-index: 0;
    }
  }
}
</style>
