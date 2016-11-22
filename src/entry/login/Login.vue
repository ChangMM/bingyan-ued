<template lang="html">
  <div class="login-wrap">
    <div class="slogan-wrap">
      <p class="slogan">做高校最好的互联网团队博客</p>
      <div class="line"></div>
      <p class="slogan-tip">种一棵树最好的时间是十年前，其次是现在。</p>
    </div>
    <div class="login-form">
      <div :class="['input-row-wrap', {'active': m_focus_1}]">
        <label for="username"><i class="fa fa-envelope fa-lg"></i></label>
        <input type="text" autocomplete='off' v-on:focus="f_focus(1)" v-model='m_username' v-on:blur="f_blur(1)" placeholder="冰岩企业邮箱"/>
      </div>
      <div :class="['input-row-wrap', {'active': m_focus_2}]">
        <label for="password"><i class="fa fa-key fa-lg"></i></label>
        <input type="password" autocomplete='off' v-on:focus="f_focus(2)" v-model='m_password' v-on:blur="f_blur(2)" placeholder="密码自己猜"/>
      </div>
      <div class="input-row-wrap">
        <input class="submit" type="button" v-on:click="f_login" value="登录"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_focus_1: false,
      m_focus_2: false,
      m_username: '',
      m_password: ''
    }
  },
  computed: {},
  mounted () {},
  methods: {
    f_focus: function (index) {
      if (index === 1) {
        this.m_focus_1 = true
      } else if (index === 2) {
        this.m_focus_2 = true
      }
    },
    f_blur: function (index) {
      if (index === 1) {
        this.m_focus_1 = false
      } else if (index === 2) {
        this.m_focus_2 = false
      }
    },
    f_check_login: function () {
      if (this.m_username.trim() === 0) {
        this.$warn('用户名不能为空')
        return false
      }
      if (this.m_password.trim() === 0) {
        this.$warn('密码不能为空')
        return false
      }
      return true
    },
    f_login: function () {
      if (!this.f_check_login()) {
        return
      }
      this.$http.post('/api/login', {
        username: this.m_username,
        password: this.m_password
      }).then(function (response) {
        // 可以由后台跳转也可以放在前端
        console.log(response.body.data)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_varilables.scss';
.login-wrap{
  left:0;
  right:0;
  top:120px;
  width:600px;
  margin:auto;
  position: absolute;
}
.slogan-wrap{
  color:#fff;
  text-align: center;
  margin-bottom: 40px;
  .slogan{
    font-size: 20px;
  }
  .slogan-tip{
    font-size: 16px;
  }
  .line{
    margin:20px auto;
    height:4px;
    width:120px;
    background-color: $bingyan-color;
  }
}
.login-form {
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3);
  padding: 40px 40px 10px;
  margin:auto;
  width: 320px;
  .input-row-wrap {
    width: 300px;
    position: relative;
    margin:0 auto 30px;
    color: lighten($bingyan-color, 30%);
    label {
      height: 44px;
      line-height: 44px;
      width: 40px;
      top: 0;
      left: 0;
      position: absolute;
      text-align: center;
    }
    &.active {
      color: $bingyan-color;
      input{
        color: $bingyan-color;
        border-color:$bingyan-color;
      }
    }
    input {
      box-sizing: border-box;
      width:100%;
      outline: none;
      border-radius:2px;
      padding-left: 40px;
      height: 44px;
      font-size: 14px;
      border: 1px solid lighten($bingyan-color, 30%);
      color:lighten($bingyan-color, 30%);
      background-color: rgba(255,255,255,0.1);
      &::-webkit-input-placeholder {
        color: $bingyan-color;
        color: lighten($bingyan-color, 30%);
      }
      &.submit {
        border: none;
        color: #fff;
        padding: 0;
        background-color: $bingyan-color;
        cursor: pointer;
        font-size: 15px;
        letter-spacing: 4px;
        &:hover {
          background-color: darken($bingyan-color, 5%);
        }
        &:active {
          background-color: darken($bingyan-color, 10%);
        }
      }
    }
  }
}
</style>
