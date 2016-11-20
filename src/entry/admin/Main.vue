<template lang="html">
  <div>
    <div class="body-header">
      <div class="header-item">
        <p class="tip">文章阅读数</p>
        <p class="num">{{ mp_data.read_num}}</p>
      </div>
      <div class="header-item">
        <p class="tip">文章点赞数</p>
        <p class="num">{{ mp_data.like_num }}</p>
      </div>
      <div class="header-item last-item">
        <p class="tip">文章分享数</p>
        <p class="num">{{ mp_data.share_num }}</p>
      </div>
    </div>
    <div class="announcement-wrap">
        <div class="announcement-header">
          公告
          <div class="line"></div>
        </div>
        <div class="announcement-body">
          <ul>
            <a v-bind:href="announcement.url" target="_blank" v-for="announcement in announcements">
              <li class="clearfix">
                <span class="title">{{announcement.title}}</span>
                <span class="date">{{announcement.date}}</span>
              </li>
            </a>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
/* global */
export default {
  data () {
    return {
      m_show_setting_panel: false,
      mp_data: {
        read_num: 123,
        like_num: 12,
        share_num: 43
      },
      announcements: [
        {
          url: '#',
          title: '这是第一条公告',
          date: '2016/10/31'
        },
        {
          url: '#',
          title: '这是第二条公告',
          date: '2016/10/31'
        },
        {
          url: '#',
          title: '这是第三条公告',
          date: '2016/10/31'
        }
      ]
    }
  },
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../../scss/_varilables.scss';
//主体样式控制
.body-header{
  padding-top: 20px;
  .header-item{
    width:32%;
    box-sizing: border-box;
    padding: 10px 8px;
    display: inline-block;
    .tip{
      color:#666;
    }
    &.last-item{
      .num{
        border-right: none;
      }
    }
    .num{
      color: $bingyan-color;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 40px;
      border-right: 1px solid #ddd;
    }
  }
}
.announcement-header{
  margin-top: 20px;
  padding:10px 0;
  .line{
    margin-top: 8px;
    width:100px;
    height:6px;
    background-color: $bingyan-color;
  }
}
.announcement-body{
  ul{
    list-style: none;
  }
  li{
    line-height: 44px;
    height:44px;
    &:hover{
      .title{
        color:$bingyan-color;
        text-decoration: underline;
      }
    }
    .title{
      color: #666;
    }
    .date{
      float: right;
      color: #999;
    }
  }
}
</style>
