<template lang="html">
  <div class="account-wrap">
    <div class="account-header">
      账号设置
      <div class="line"></div>
    </div>
    <div class="account-body">
      <div class="input-wrap">
        <label for="avatar">头像</label>
        <!-- <div class="input-avatar-wrap">
          <input type="file" id="avatar-input" class="file-input" name="avatar" id="avatar">
          <img v-bind:src="m_avatar?m_avatar:m_default_avatar" v-bind:style="avatarStyle" />
        </div> -->
        <img v-bind:src="m_avatar" class="avatar-img" />
        <span class="float-right alter">修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">名称</label>
        <span>{{m_name}}<span/>
        <span class="float-right alter">修改</span>
      </div>
      <div class="input-wrap textarea-wrap">
        <label for="avatar">个人主页</label>
        <span class="mult-line">{{m_link}}</span>
        <!-- <textarea name="name" class="intro" v-model="m_intro"></textarea> -->
        <span class="float-right alter">修改</span>
      </div>
      <div class="input-wrap textarea-wrap">
        <label for="avatar">个人简介</label>
        <span class="mult-line">{{m_intro}}</span>
        <!-- <textarea name="name" class="intro" v-model="m_works"></textarea> -->
        <span class="float-right alter">修改</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_avatar: '/static/img/logo.png',
      m_name: '子矜',
      m_intro: '渡尽劫波兄弟在，相逢一笑泯恩仇。',
      m_link: 'https://github.com/ChangMM',
      avatarStyle: {
        width: '100%',
        height: 'auto'
      }
    }
  },
  ready () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import "../../../scss/_varilables.scss";
  .account-wrap{
    .account-header{
      padding:10px 0;
      font-size:16px;
      font-weight: bolder;
      .line{
        margin-top: 16px;
        width:100px;
        height:6px;
        background-color: $bingyan-color;
      }
    }
    .account-body{
      .input-wrap{
        padding:20px 0;
        border-bottom: 1px solid #eee;
        label{
          display: inline-block;
          width:66px;
          margin-right: 20px;
          color:#666;
          text-align: right;
        }
        &.textarea-wrap{
          label{
            vertical-align: top;
          }
        }
        .mult-line{
          display: inline-block;
          width: 600px;
        }
        // .input-avatar-wrap{
        //   display: inline-block;
        //   vertical-align: middle;
        //   overflow: hidden;
        //   position: relative;
        //   border-radius: 50%;
        //   background-color: #eee;
        //   width:40px;
        //   height:40px;
        //   input{
        //     cursor: pointer;
        //     opacity: 0;
        //     position: absolute;
        //     z-index: 1;
        //     top:0;
        //     left:0;
        //     width:100%;
        //     height:100%;
        //     border-radius: 50%;
        //   }
        //   img{
        //     position: absolute;
        //     top:50%;
        //     left:50%;
        //     border-radius: 50%;
        //     transform: translate3d(-50%,-50%,0);
        //     z-index: 0;
        //   }
        // }
        .avatar-img{
          vertical-align: middle;
          height:40px;
          width:40px;
          border-radius: 50%;
        }
        input{
          height:24px;
          width:40px;
          text-align: center;
          padding-left:5px;
          margin-right: 5px;
          outline: none;
          border:1px solid #ddd;
          border-radius: 2px;
          color:$bingyan-color;
          &:focus{
            border-color: $bingyan-color;
          }
        }
        textarea{
          height:100px;
          width:600px;
          padding:5px;
          outline:none;
          border:1px solid #ddd;
          border-radius: 2px;
          resize: none;
          &:focus{
            border-color: $bingyan-color;
          }
        }
        .tip{
          color:#999;
        }
        .alter{
          cursor: pointer;
          color:#666;
          &:hover{
            color: $bingyan-color;
          }
        }
      }
    }
  }
</style>
