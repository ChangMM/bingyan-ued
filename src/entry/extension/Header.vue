<template>
  <header id="header" class="select-no">
    <div class="left">
      <span class="date">{{m_date | timestamp}}</span>
      <span class='weekday' :class="{'active': m_date.getDay() == 5 || m_date.getDay() == 6 || m_date.getDay() == 0}">{{m_date | week}} </span>
      <span class="emoji-wrap" v-show="m_date.getDay() == 5">
        <img src="https://image.bingyan.net/icons/kaixin.png" class="emoji" alt="周末真开心">
        <a href="https://www.douban.com/location/">周末要来了，点击查看周末怎么玩</a>
      </span>
      <span class="emoji-wrap" v-show="m_date.getDay() == 6 || m_date.getDay() == 0">
        <img src="https://image.bingyan.net/icons/kaixin.png" class="emoji" alt="周末真开心">
        <a href="https://www.douban.com/location/">周末来了，点击查看周末怎么玩</a>
      </span>
    </div>
    <div class="right">
      <span class="setting" v-on:click="f_setting"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      m_date: new Date()
    }
  },
  mounted () {

  },
  methods: {
    f_setting (event) {
      this.$emit('setting')
      event.stopPropagation()
    }
  }
}
</script>
<style scoped lang="scss">
#header{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 30px;
  z-index: 1;
  .left{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    text-shadow: 1px 1px 1px #666;
    float: left;
    span{
      display: inline-block;
    }
    .date{
      margin-left: 10px;
    }
    .active{
      color: rgb(253, 223, 109);
    }
    .random-article{
      font-size: 13px;
      text-decoration: none;
      &:hover{
        text-decoration: underline;
      }
    }
    .emoji-wrap{
      .emoji{
        height: 24px;
        vertical-align: -6px;
      }
      a{
        color: rgb(253, 223, 109);
        font-size: 12px;
        text-decoration: none;
        &:hover{
          text-decoration: underline;
        }
      }
      .close{
        height: 14px;
      }
    }
  }
  .right{
    float: right;
    height: 30px;
    line-height: 30px;
    span,a{
      display: inline-block;
      vertical-align: middle;
    }
    .setting,.weibo{
      cursor: pointer;
      margin-right: 10px;
      background-size: cover;
      background-repeat: no-repeat;
      transition: all ease 0.2s;
    }
    .setting{
      height: 20px;
      width: 20px;
      background-image: url('https://image.bingyan.net/icons/setting.png');
      &:hover{
        background-image: url('https://image.bingyan.net/icons/setting-hover.png');
      }
    }
  }
}
</style>
