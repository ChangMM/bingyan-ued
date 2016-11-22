<template lang="html">
  <div class="account-wrap">
    <div class="account-header">
      账号设置
      <div class="line"></div>
    </div>
    <div class="account-body">
      <div class="input-wrap">
        <label for="avatar">头像</label>
        <img v-bind:src="m_avatar" class="avatar-img" />
        <span class="float-right alter" v-on:click='f_show_avatar_panel'>修改</span>
      </div>
      <div class="input-wrap">
        <label for="avatar">名称</label>
        <span>{{m_nickname}}<span/>
        <span class="float-right alter"  v-on:click='f_show_name_panel'>修改</span>
      </div>
      <div class="input-wrap textarea-wrap">
        <label for="avatar">个人主页</label>
        <span class="mult-line">{{m_homepage}}</span>
        <span class="float-right alter">修改</span>
      </div>
      <div class="input-wrap textarea-wrap">
        <label for="avatar">个人简介</label>
        <span class="mult-line">{{m_intro}}</span>
        <span class="float-right alter" v-on:click='f_show_intro_panel'>修改</span>
      </div>
    </div>
    <avatar-panel v-show="m_avatar_panel_show" :refresh='f_get_user_info' :content='m_avatar' v-on:close='f_close_avatar_panel'> </avatar-panel>
    <intro-panel v-show="m_intro_panel_show" :refresh='f_get_user_info' :content='m_intro' v-on:close='f_close_intro_panel'> </intro-panel>
    <name-panel v-show="m_name_panel_show" :refresh='f_get_user_info' :content='m_nickname' v-on:close='f_close_name_panel'> </name-panel>
  </div>
</template>

<script>
import AvatarPanel from './AvatarPanel.vue'
import IntroPanel from './IntroPanel.vue'
import NamePanel from './NamePanel.vue'
export default {
  data () {
    return {
      m_avatar_panel_show: false,
      m_intro_panel_show: false,
      m_name_panel_show: false,
      m_avatar: '',
      m_nickname: '',
      m_homepage: '',
      m_intro: '',
      m_rank: ''
    }
  },
  mounted () {
    this.f_get_user_info()
  },
  methods: {
    f_get_user_info: function () {
      this.$http.get('/api/user/info').then(function (response) {
        let body = response.body
        this.m_avatar = body.data.avatar
        this.m_nickname = body.data.nickname
        this.m_intro = body.data.intro
        this.m_homepage = body.data.homepage
        this.m_rank = body.data.rank
      })
    },
    f_show_avatar_panel: function () {
      this.m_avatar_panel_show = true
    },
    f_close_avatar_panel: function () {
      this.m_avatar_panel_show = false
    },
    f_show_intro_panel: function () {
      this.m_intro_panel_show = true
    },
    f_close_intro_panel: function () {
      this.m_intro_panel_show = false
    },
    f_show_name_panel: function () {
      this.m_name_panel_show = true
    },
    f_close_name_panel: function () {
      this.m_name_panel_show = false
    }
  },
  components: {
    AvatarPanel,
    IntroPanel,
    NamePanel
  }
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
