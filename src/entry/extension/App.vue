<template>
  <div id="app">
    <div class="intro-wrap">
      <div class="title-wrap">
        <img src="https://image.bingyan.net/logo/fries.png" alt="Fries Tab" class="logo">
        <p class="title">Fries Tab(薯条标签页)</p>
        <p class="tip">优雅的静态壁纸与灵性的动态壁纸的新标签页，优化快捷的搜索工具，每天推荐一篇精选文章。(一款chrome插件)</p>
      </div>
      <div class="download-btn-wrap">
        <a href="https://image.bingyan.net/file/FriesTab_1_0_0.crx" class="download-btn">下载插件</a>
        <a href="#tution" class="tip">查看安装教程</a>
      </div>
      <div class="thumb-wrap">
        <div class="tab-wrap" v-on:click="f_close_panel">
          <header-bar v-on:setting="f_show_setting"></header-bar>
          <search></search>
          <setting v-show="m_setting_show" v-on:close="f_close_setting"></setting>
          <wall-paper></wall-paper>
        </div>
        <img class="bg-thumb" src="https://image.bingyan.net/intro/thumb@2x.png" alt="">
      </div>
      <div class="download-wrap" id="tution">
        <div class="chrome-tution tution-item">
          <h4 class='header'>Chrome浏览器插件安装教程</h4>
          <p class="tip">翻墙用户<a href="https://chrome.google.com/webstore/detail/fries-tab/kgiadcljdpifbobjkjdminppdepmeoob?hl=zh-CN" target="_blank">点这里前往应用商店</a>下载安装</p>
          <div class="tution-content">
            <img src="./chrome-1.png" class="img" alt="chrome浏览器安装新媒体管家插件教程">
            <p class="title">1、下载安装文件</p>
            <p class="detail">点击下载按钮下载插件成功后，可以在下载文件夹中找到下载好的文件，后缀是 <mark>.crx</mark> 。</p>
            <p class="note">注：如果出现警告项，请选择保留，这是浏览器的默认设置，插件不会对你的计算机造成任何危害。</p>
          </div>
          <div class="tution-content">
            <img src="./chrome-2.png" class="img" alt="chrome浏览器安装新媒体管家插件教程">
            <p class="title">2、打开浏览器扩展安装页面</p>
            <p class="detail">你可以点击插件右上角选项卡，通过路径 <mark>更多工具－扩展程序</mark> 进入扩展安装页面。</p>
            <p class="note">注：或者复制<mark>chrome://extensions</mark>并粘贴到地址栏，按回车键进入安装页面。</p>
          </div>
          <div class="tution-content">
            <img src="./chrome-3.png" class="img" alt="chrome浏览器安装新媒体管家插件教程">
            <p class="title">3、拖拽文件安装</p>
            <p class="detail">通过拖拽下载文件夹中的插件文件到扩展安装页面内即可安装。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from './Header.vue'
import Search from './Search.vue'
import Setting from './Setting.vue'
import WallPaper from './WallPaper/WallPaper.vue'
export default {
  name: 'app',
  data: () => ({
    m_videoH: 0,
    m_videoW: 0,
    m_loaded: false,
    m_setting_show: false
  }),
  mounted () {},
  methods: {
    f_show_setting () {
      this.m_setting_show = true
    },
    f_close_setting () {
      this.m_setting_show = false
    },
    f_close_panel () {
      this.m_setting_show = false
    }
  },
  components: {
    Search,
    Setting,
    HeaderBar,
    WallPaper
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
}
a{
  text-decoration: none;
  color: inherit;
}
#app {
  height: 100%;
  margin: auto;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  position: relative;
  box-sizing: border-box;
  font-family:"PingFangSC-Regular", "Helvetica Neue", Helvetica, "Lantinghei SC", SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .intro-wrap{
    .title-wrap{
      padding: 30px 0 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      vertical-align: middle;
      margin-bottom: 10px;
      .logo{
        height: 30px;
        vertical-align: -6px;
      }
      .title{
        display: inline-block;
        font-size: 22px;
        font-weight: bold;
      }
      .tip{
        line-height: 20px;
        height: 20px;
        color: #666;
      }
    }
    .download-btn-wrap{
      text-align: center;
      margin-bottom: 20px;
      .download-btn{
        display: inline-block;
        width: 150px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        background-color: #fcae26;
        transition: all ease 0.2s;
        &:hover{
          box-shadow: 0 6px 10px rgba(#fcae26, 0.3);
        }
      }
      .tip{
        color: #666;
        &:hover{
          text-decoration:underline;
        }
      }
    }
    .thumb-wrap{
      width: 1200px;
      margin: auto;
      position: relative;
      border: 1px solid #ccc;
      font-size: 0;
      border-radius: 4px;
      .bg-thumb{
        width: 1200px;
      }
      .tab-wrap{
        left:0;
        top:69px;
        width: 1200px;
        position: absolute;
        height: 691px;
        overflow: hidden;
      }
    }
  }
  .download-wrap{
    margin-top: 20px;
    .tution-item{
      padding-top: 30px;
      padding-bottom: 20px;
      background-color: #f5f5f5;
      text-align: center;
      border-top: 1px solid #eee;
      .header{
        font-size: 20px;
        line-height: 40px;
        height: 40px;
      }
      .tip{
        color: #666;
        margin-bottom:20px;
        a{
          color: #fcae26;
          &:hover{
            text-decoration:underline;
          }
        }
      }
      .tution-content{
        width: 240px;
        margin-right: 60px;
        display: inline-block;
        vertical-align: top;
        &:last-of-type{
          margin-right: 0;
        }
        .img{
          width: 100%;
        }
        p{
          text-align: left;
          &.title{
            font-weight: bold;
            height: 40px;
            line-height: 40px;
          }
          &.detail{
            color: #666;
            line-height: 1.6;
            text-align: justify;
          }
          &.note{
            font-size: 12px;
            margin-top: 10px;
            line-height: 1.5;
            color: #999;
            text-align: justify;
          }
        }
        mark{
          display: inline-block;
          padding-left: 6px;
          padding-right: 6px;
          line-height: 18px;
          color: #333;
          border-radius: 2px;
          background-color: rgba(27, 147, 251, 0.2);
        }
      }
    }
  }
}
</style>
