<template>
  <div>
    <div id="search" class="select-no">
      <div class="intro-wrap">
        <p class="time-wrap">
          <span class="hour">{{m_time.hour | calLessTen}}</span>
          <span class="dot">:</span>
          <span class="minute">{{m_time.minute | calLessTen}}</span>
        </p>
        <div class="name-wrap">
          <span>{{m_nickname || '朋友'}},</span>
          <template v-if="m_time.hour >= 0 && m_time.hour < 5">
            <span>夜已深了。</span>
          </template>
          <template v-if="m_time.hour >= 5 && m_time.hour < 8">
            <span>早上好！</span>
          </template>
          <template v-if="m_time.hour >= 8 && m_time.hour < 12">
            <span>上午好！</span>
          </template>
          <template v-if="m_time.hour >= 12 && m_time.hour < 19">
            <span>下午好！</span>
          </template>
          <template v-if="m_time.hour >= 19 && m_time.hour < 24">
            <span>晚上好！</span>
          </template>
        </div>
      </div>
      <div class="search-wrap">
        <div class="search-input-wrap clearfix">
          <div class="search-logo-wrap" v-on:click='m_enginse_choose_show = !m_enginse_choose_show'>
            <img :src="m_cur_engine.logo" class="search-logo" alt="搜索引擎logo">
            <img src="https://image.bingyan.net/icons/down.png" class="down" alt="下拉按钮">
          </div>
          <input type="text" ref="search" class="search-input" v-model="m_search_word" v-on:keyup.enter='f_search'>
          <span class='search-button' v-on:click="f_search">
            <img src="https://image.bingyan.net/icons/search.png" class="search-icon" alt="搜索图标">
          </span>
        </div>
      </div>
    </div>
    <div class="search-engine-choose" v-show="m_enginse_choose_show" v-on:click='m_enginse_choose_show = !m_enginse_choose_show'>
      <div class="choose-panel clearfix">
        <div class="choose-item" v-for="item,index in m_engines" v-on:click="f_choose_engine(index)">
          <img :src="item.logo" class="logo" alt="google">
          <p>{{item.name}}</p>
        </div>
        <div class="choose-item" v-on:click="f_choose_engine('more')">
          <img src="https://image.bingyan.net/icons/plus.png" class="logo" alt="添加">
          <p>添加更多</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Engine from './Engine.js'
import Status from './Status.js'
export default {
  name: 'search',
  data: () => ({
    m_time: {
      hour: 0,
      minute: 0
    },
    m_nickname: '朋友',
    m_search_type: 0,
    m_engines: Engine,
    m_search_word: '',
    m_enginse_choose_show: false,
    m_cur_engine: {
      search: []
    }
  }),
  mounted () {
    this.m_cur_engine = this.m_engines[0]
    this.$refs.search.focus()
    this.m_time.hour = new Date().getHours()
    this.m_time.minute = new Date().getMinutes()

    // 获取当前时间
    setInterval(() => {
      this.m_time.hour = new Date().getHours()
      this.m_time.minute = new Date().getMinutes()
    }, 1000)

    // 监听昵称修改的变化
    Status.$on('nickname', (nickname) => {
      this.m_nickname = nickname
    })
  },
  methods: {
    f_choose_search_type (type) {
      this.m_search_type = type
    },
    f_choose_engine (index) {
      if (index === 'more') {
        return window.open('https://wj.qq.com/s/1581201/50d9/')
      }
      this.m_cur_engine = this.m_engines[index]
      this.m_search_type = 0
      this.m_enginse_choose_show = !this.m_enginse_choose_show
    },
    f_search () {
      if (this.m_search_word.trim() === '') {
        return
      }
      let url = this.m_cur_engine.search[this.m_search_type].url
      window.location.href = url + this.m_search_word
    }
  }
}
</script>
<style lang="scss" scoped>
#search{
  position: absolute;
  z-index: 1;
  width: 590px;
  padding: 40px;
  top:60px;
  left:0;
  right:0;
  margin: auto;
  border-radius: 4px;
  .intro-wrap{
    text-align: center;
    text-shadow: 1px 1px 1px #666;
    .time-wrap{
      color: #fff;
      span{
        display: inline-block;
        height: 60px;
        line-height: 60px;
        font-size: 60px;
        &.dot{
          position: relative;
          top:-5px;
        }
      }
    }
    .name-wrap{
      margin-top: 10px;
      font-size: 16px;
      color: #fff;
      position: relative;
      left: 6px;
    }
  }
  .search-wrap{
    .search-input-wrap{
      position: relative;
      filter: drop-shadow(0 0 10px #eee);
      margin-top: 30px;
      height: 40px;
    }
    .search-logo-wrap{
      position: absolute;
      top:0;
      left:0;
      height: 100%;
      line-height: 40px;
      width: 44px;
      padding-left: 10px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      .search-logo{
        width: 18px;
        vertical-align: middle;
      }
      .down{
        height: 14px;
        vertical-align: middle;
      }
      &:hover{
        cursor: pointer;
        background-color: #eee;
      }
    }
    .search-input{
      width: 500px;
      height: 100%;
      outline: none;
      border: none;
       background-color: #fff;
       border-top-left-radius: 4px;
       border-bottom-left-radius: 4px;
       font-size: 16px;
       color: #333;
       padding-left: 50px;
       letter-spacing: 1.2px;
       font-weight: 400;
       float: left;
    }
    .search-button{
      height: 100%;
      width: 40px;
      float: left;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      display: inline-block;
      background-color: #fff;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      &:hover{
        background-color: #eee;
      }
      &:active{
        background-color: #ddd;
      }
      .search-icon{
        height: 24px;
        vertical-align: middle;
      }
    }
  }
}
.search-engine-choose{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0,0,0,0.6);
  .choose-panel{
    width: 590px;
    background-color: #fff;
    position: absolute;
    top:280px;
    border-radius: 4px;
    left:0;
    right:0;
    margin: auto;
    border: 1px solid #eee;
    .choose-item{
      width: 12.5%;
      padding: 8px;
      float:left;
      color: #666;
      font-size: 12px;
      text-align: center;
      border-right: 1px solid #eee;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      .cancel{
        height: 20px;
        width: 20px;
        position: absolute;
        top:2px;
        right: 2px;
      }
      .logo{
        width:22px;
      }
      &.choose-plus{
        height: 69px;
        line-height: 53px;
        .plus{
          height: 30px;
          vertical-align: middle;
        }
      }
      &:hover{
        cursor: pointer;
        background-color: #eee;
      }
    }
  }
}
</style>
