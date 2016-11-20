<template lang="html">
  <div class="release-wrap">
    <div class="release-header">
      作品发布
      <div class="line"></div>
      <span class="tip">要知道
        <img src="http://newbbs.bingyan.net/assets/emojis/point_right.png" class="emoji"/>
        <img src="http://newbbs.bingyan.net/assets/emojis/point_right.png" class="emoji"/>
        我们可是要做最好的互联网团队博客的
        <img src="http://newbbs.bingyan.net/assets/emojis/see_no_evil.png" class="emoji"/>
      </span>
    </div>
    <div class="button-wrap">
      <span class="button hollow-button">从作品库中选择</span>
      <a href="/new.html"><span class="button solid-button">新建作品</span></a>
    </div>
    <p class="sub-title">已发布</p>
    <Articles :published.sync='m_published'></Articles>
  </div>
</template>

<script>
import Articles from './Articles'
export default {
  data () {
    return {
      m_published: [
        {
          title: '曾经沧海难为水，除却巫山不是云',
          digest: '青山在，绿水流，只记缘，不记仇',
          cover: '/static/img/default_cover.png',
          updateTime: new Date()
        },
        {
          title: '曾经沧海难为水，除却巫山不是云',
          digest: '青山在，绿水流，只记缘，不记仇',
          cover: '/static/img/default_cover.png',
          updateTime: new Date()
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
    Articles
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../scss/_varilables.scss";
  @import "../../../scss/components/_button.scss";
  .release-header{
    padding:10px 0;
    font-size:16px;
    font-weight: bolder;
    .line{
      margin-top: 16px;
      margin-bottom: 30px;
      width:100px;
      height:6px;
      background-color: $bingyan-color;
    }
    .tip{
      color:#999;
      font-size: 12px;
      font-weight: normal;
      img.emoji{
        height:18px;
        vertical-align: -3px;
      }
    }
  }
  .button-wrap{
    margin-top: 4px;
    .button{
      margin-right: 60px;
      height: 34px;
      line-height: 34px;
      width:140px;
      border:1px solid $bingyan-color;
      cursor: pointer;
      &.hollow-button{
        color: $bingyan-color;
        &:hover{
          color: #fff;
          background-color: darken($bingyan-color,5%);
        }
        &:active{
          color: #fff;
          background-color: darken($bingyan-color,10%);
        }
      }
      &.solid-button{
        color: #fff;
        background-color: $bingyan-color;
        &:hover{
          background-color: darken($bingyan-color,5%);
        }
        &:active{
          background-color: darken($bingyan-color,10%);
        }
      }
    }
  }
  .sub-title{
    margin-top: 30px;
  }
</style>
