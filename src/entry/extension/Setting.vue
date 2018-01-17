<template>
  <transition name="fade">
    <div id="setting" v-on:click="f_stop_propagation">
      <div class="header">
        <span class="close" v-on:click='f_close'></span>
        <ul>
          <li :class="{'active': m_index =='article'}" v-on:click='f_change_index("article")'>
            <i class="icon daohang"></i>
            <span>每日一文</span>
          </li>
          <li :class="{'active': m_index =='bizhi'}" v-on:click='f_change_index("bizhi")'>
            <i class="icon bizhi"></i>
            <span>壁纸</span>
          </li>
          <li :class="{'active': m_index =='shezhi'}" v-on:click='f_change_index("shezhi")'>
            <i class="icon shezhi"></i>
            <span>设置</span>
          </li>
        </ul>
      </div>
      <div class="content">
        <!-- 每日一文 -->
        <div class="inner-content article" v-show="m_index == 'article'">
          <ArticleItem ></ArticleItem>
        </div>
        <!-- 设置壁纸 -->
        <div class="inner-content bizhi" v-show="m_index == 'bizhi'">
          <div class="nav">
            <ul>
              <li :class="{'active': m_wall_nav == 0}" v-on:click="f_choose_wall(0)">静态壁纸</li>
              <li :class="{'active': m_wall_nav == 1}" v-on:click="f_choose_wall(1)">动态壁纸</li>
            </ul>
          </div>
          <ImageChoose class="nav-content clearfix" v-show="m_wall_nav == 0" v-bind:data="{type: m_index, nav: m_wall_nav}"></ImageChoose>
          <VideoChoose class="nav-content clearfix" v-show="m_wall_nav == 1" v-bind:data="{type: m_index, nav: m_wall_nav}"></VideoChoose>
        </div>
        <!-- 插件设置 -->
        <div class="inner-content shezhi" v-show="m_index == 'shezhi'">
          <div class="nav-content clearfix">
            <div class="setting-content">
              <div class="input-wrap">
                <p class="label">设置昵称</p>
                <input type="text" v-model="m_nickname">
              </div>
              <div class="input-wrap">
                <p class="label">呼出搜索框快捷键(暂不支持设置)</p>
                <p class='intro'>Win:<mark>Ctrl</mark> + <mark>K</mark></p>
                <p class='intro'>Mac:<mark>Cmd</mark> + <mark>K</mark></p>
              </div>
              <div class="zan-wrap">
                <p class="zan-tip">真诚赞赏，手留余香</p>
                <img class="zan-img" src="https://image.bingyan.net/zan.png" alt="">
              </div>
              <div class="contact-me">
                <a href="https://weibo.com/u/3897687414" target="_blank" class="weibo">微博联系</a>
                <a href="https://wj.qq.com/s/1818865/d791/" target="_blank" class="feedback">反馈建议</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 </transition>
</template>
<script>
import VideoChoose from './WallPaper/VideoChoose.vue'
import ImageChoose from './WallPaper/ImageChoose.vue'
import ArticleItem from './Article.vue'
import Status from './Status.js'
export default {
  name: 'artile',
  data: () => ({
    m_index: 'article',
    m_wall_nav: -1,
    m_nickname: '朋友'
  }),
  mounted () {},
  watch: {
    m_nickname: function (val) {
      Status.$emit('nickname', this.m_nickname)
    }
  },
  methods: {
    f_change_index (index) {
      this.m_index = index
      if (index === 'bizhi' && this.m_wall_nav === -1) {
        this.m_wall_nav = 0
      }
    },
    f_close () {
      this.$emit('close')
    },
    f_choose_wall (nav) {
      this.m_wall_nav = nav
    },
    f_stop_propagation (event) {
      event.stopPropagation()
    }
  },
  components: {
    VideoChoose,
    ImageChoose,
    ArticleItem
  }
}
</script>
<style lang="scss" scoped>
#setting{
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  height: 100%;
  width:360px;
  border-left: 1px solid #ddd;
  background-color: #f8f9fb;
  padding-top: 60px;
  box-sizing: border-box;
  &.fade-enter-active, &.fade-leave-active {
    transition: all .3s;
  }
  &.fade-enter, &.fade-leave-to {
    right: -360px;
  }
  .header{
    background-color: #eee;
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    border-bottom: 1px solid #ddd;
    .close{
      position: absolute;
      top:15px;
      right: 15px;
      width: 16px;
      height: 16px;
      cursor: pointer;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url('https://image.bingyan.net/icons/close.png');
      transition: all ease 0.2s;
      &:hover{
        background-image: url('https://image.bingyan.net/icons/close-hover.png');
      }
    }
    ul{
      list-style: none;
      text-align: center;
      li{
        height: 40px;
        width: 66px;
        font-size: 14px;
        list-style: none;
        color: #999;
        display: inline-block;
        cursor: pointer;
        &:hover, &.active{
          color: #333;
          .daohang{
            background-image: url('https://image.bingyan.net/icons/daohang-hover.png');
          }
          .bizhi{
            background-image: url('https://image.bingyan.net/icons/bizhi-hover.png');
          }
          .jishi{
            background-image: url('https://image.bingyan.net/icons/jishi-hover.png');
          }
          .shezhi{
            background-image: url('https://image.bingyan.net/icons/setting-black-hover.png');
          }
        }
        .icon{
          display: inline-block;
          width: 100%;
          height: 18px;
          background-size: 18px;
          background-position: center center;
          background-repeat: no-repeat;
          transition: all ease 0.2s;
        }
        .daohang{
          background-image: url('https://image.bingyan.net/icons/daohang.png');
        }
        .bizhi{
          background-image: url('https://image.bingyan.net/icons/bizhi.png');
        }
        .jishi{
          background-size: 14px;
          background-image: url('https://image.bingyan.net/icons/jishi.png');
        }
        .shezhi{
          background-image: url('https://image.bingyan.net/icons/setting.png');
        }
        span{
          display: inline-block;
          width: 100%;
          text-align: center;
          transition: all ease 0.2s;
        }
      }
    }
  }
  .content{
    height: 100%;
    .inner-content{
      height: 100%;
      position: relative;
      &.bizhi{
        padding-left: 80px;
      }
      .nav{
        position: absolute;
        top:1px;
        left: 0;
        border-right: 1px solid #ddd;
        width: 80px;
        height: 100%;
        background-color: #eee;
        li{
          list-style: none;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 13px;
          color: #999;
          transition: all ease 0.3s;
          cursor: pointer;
          &.active,&:hover{
            background-color: #fff;
            color: #333;
          }
        }
      }
      .nav-content{
        height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width:4px!important;
          height:7px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius:2px;
          background: #ddd;
        }
      }
      .setting-content{
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 2px;
        margin: 15px;
        padding: 10px;
        .input-wrap{
          margin-bottom: 30px;
          text-align: center;
          .label{
            height: 30px;
            line-height: 30px;
            color: #333;
          }
          .intro{
            color: #666;
            font-size: 12px;
            mark{
              display: inline-block;
              padding: 0px 4px;
              line-height: 1.2;
              background-color: rgba(27,147,251,.2);
              border-radius: 2px;
              color: #333;
            }
          }
          input{
            height: 30px;
            width: 160px;
            border: 1px solid #ddd;
            outline: none;
            border-radius: 2px;
            box-sizing: border-box;
            padding-left: 5px;
            font-size: 14px;
            color: #666;
            text-align: center;
            &:focus{
              border-color: #fddf6d;
            }
          }
        }
        .zan-wrap{
          text-align: center;
          margin-bottom: 30px;
          .zan-tip{
            text-align: center;
            height: 30px;
            line-height: 30px;
            color: #333;
          }
          .zan-img{
            width: 240px;
          }
        }
        .contact-me{
          line-height: 30px;
          height: 30px;
          font-size: 12px;
          text-align: center;
          color: #666;
          a{
            text-decoration: none;
            &:hover{
              text-decoration:underline;
            }
          }
          .weibo{
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
