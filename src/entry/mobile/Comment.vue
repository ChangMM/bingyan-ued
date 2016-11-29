<template lang="html">
  <!-- 验证码 -->
  <div class="by-comment">
    <p class="by-comment-header">我要评论</p>
    <input type="text" class="by-input-default by-comment-name" v-model='m_name' placeholder="你的大名"/>
    <div class="by-comment-pin-wrap">
      <input type="text" class="by-input-default by-comment-pin"  v-model='m_pin' placeholder="验证码"/>
      <img :src="m_pin_src" class="by-pin" v-on:click='f_get_pin'  alt="验证码" title="点击刷新验证码"/>
    </div>
    <div :class="['comment-textarea-wrap', {'active': m_text_focus }]">
      <textarea name="comment-textarea" class="by-textarea-default by-comment-text" v-on:focus="f_text_focus" v-on:blur="f_text_blur"  v-model='m_content'></textarea>
      <div class="by-submit-wrap">
        <input type="button" class="by-input-default by-submit" v-on:click="f_comment" value="评论"/>
        <span>支持表情，见<a href="http://www.webpagefx.com/tools/emoji-cheat-sheet/" target="_blank">Emoji</a> </span>
        <span class="error-tip" v-show="m_error_show">❌：{{m_error_msg}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_pin_src: '',
      m_pin: '',
      m_name: '',
      m_content: '',
      m_error_show: false,
      m_text_focus: false,
      m_error_msg: '这是错误提示信息'
    }
  },
  computed: {
    m_cal_content: function () {
      return this.$encodeHtml(this.m_content)
    }
  },
  props: ['articleId', 'refresh'],
  mounted () {
    this.f_get_pin()
  },
  methods: {
    f_get_pin: function () {
      // 获取验证码
      this.$http.get('/api/pin').then(function (response) {
        this.m_pin_src = response.body.data
      })
    },
    f_text_focus: function () {
      this.m_text_focus = true
    },
    f_text_blur: function () {
      this.m_text_focus = false
    },
    f_check_comment: function () {
      if (this.m_name.trim() === '') {
        this.m_error_msg = '姓名不能为空'
        return false
      }
      if (this.m_name.trim().gblen() > 20) {
        this.m_error_msg = '昵称过长'
        return false
      }
      if (this.m_pin.trim() === '') {
        this.m_error_msg = '验证码不能为空'
        return false
      }
      if (this.m_content.trim() === '') {
        this.m_error_msg = '评论内容不能为空'
        return false
      }
      return true
    },
    f_comment_callback: function () {
      this.m_pin = ''
      this.m_name = ''
      this.m_content = ''
      this.m_error_show = false
      this.f_get_pin()
    },
    f_comment: function () {
      if (!this.f_check_comment()) {
        this.m_error_show = true
        return
      } else {
        this.m_error_show = false
      }
      // 提交评论的数据
      this.$http.post('/api/comment', {
        name: this.m_name,
        pin: this.m_pin,
        pin_src: this.pin_src,
        content: this.m_cal_content,
        article_id: this.articleId
      }).then(function (response) {
        if (response.body.status === 1) {
          this.refresh()
          this.f_comment_callback()
        } else {
          this.m_error_msg = response.body.msg
          this.m_error_show = true
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import "../../scss/_varilables.scss";
//输入框基本样式
.by-input-default{
  padding:5px;
  outline:none;
  border:1px solid $border-color;
  border-radius:2px;
  font-size: 13px;
  &:focus{
    border-color: $bingyan-color;
  }
  box-sizing: border-box;
}
.by-textarea-default{
  border:1px solid $border-color;
  border-radius:2px;
  outline:none;
  padding: 5px;
  font-size: 13px;
  &:focus{
    border-color: $bingyan-color;
  }
}

//评论框组件的基本样式
.by-comment{
  margin-top: 30px;
  margin-bottom: 20px;
  .by-comment-header{
    font-size: 16px;
    padding:5px 0;
    color: $baseTextColor;
  }
  .by-comment-name{
    width:100%;
    height:36px;
    margin-bottom: 5px;
  }
  //验证码的区域
  .by-comment-pin-wrap{
    .by-comment-pin{
      width:56%;
      height:36px;
    }
    .by-pin{
      width:40%;
      border-radius: 2px;
      height:34px;
      float: right;
      border:1px solid $border-color;
    }
  }
  // textarea的区域
  .comment-textarea-wrap{
    margin-top: 5px;
    padding:10px;
    border:1px solid $border-color;
    border-radius:2px;
    &.active{
      border-color: $bingyan-color;
    }
    .by-comment-text{
      height:80px;
      padding:0;
      width:100%;
      border:none;
      resize: none;
    }
    .by-submit-wrap{
      .by-submit{
        padding-left: 20px;
        padding-right: 20px;
        height:30px;
        cursor: pointer;
        background-color: $bingyan-color;
        border:none;
        color:#fff;
        &:hover{
          background-color: darken($bingyan-color,10%);
        }
        &:active{
          background-color: darken($bingyan-color,15%);
        }
      }
      span{
        font-size: 12px;
        color: #999;
        a{
          color: $bingyan-color;
          &:hover{
            text-decoration: underline;
          }
        }
        &.error-tip{
          margin-left: 5px;
          color:#ff6c74;
        }
      }
    }

  }
}

</style>
