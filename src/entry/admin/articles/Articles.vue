<template lang="html">
  <div class="articles-wrap">
    <div class="articles-header">
      作品库
      <div class="line"></div>
    </div>
    <div class="search-wrap clearfix">
      <input type="text" class="search-input" v-model="m_search_title" placeholder="输入标题文字">
      <a href="/new"><span class='button float-right'>新建作品</span></a>
    </div>
    <div class="articles-wrap">
      <template v-if="m_libs!=0">
        <div class="article-item clearfix" v-for="lib in orderedLibs">
          <img v-bind:src="lib.cover?lib.cover:m_default_cover" class="article-cover" alt="封面图" />
          <div class="article-info">
            <span class="article-title">{{lib.title}}</span>
            <span class="article-intro">{{lib.digest}}</span>
          </div>
          <div class="float-right time-wrap">
            <span class="article-time">{{lib.updateTime | timestampFormat}}</span>
            <p class="operation-wrap">
              <span class="edit">编辑</span>
              <span class="cancel">删除</span>
            </p>
          </div>
        </div>
      </template>
      <template v-if="m_libs==0">
        <p class="no-article">暂无内容</p>
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      m_default_cover: require('../../../assets/default_cover.png'),
      m_search_title: '',
      m_libs: [
        {
          title: '曾经沧海难为水，除却巫山不是云',
          digest: '青山在，绿水流，只记缘，不记仇',
          cover: '/static/img/default_cover.png',
          updateTime: new Date()
        },
        {
          title: '渡尽劫波兄弟在，相逢一笑泯恩仇',
          digest: '青山在，绿水流，只记缘，不记仇',
          cover: '/static/img/default_cover.png',
          updateTime: new Date()
        },
        {
          title: '今朝有酒今朝醉，明日愁来明日忧',
          digest: '青山在，绿水流，只记缘，不记仇',
          cover: '/static/img/default_cover.png',
          updateTime: new Date()
        }
      ]
    }
  },
  computed: {
    orderedLibs: function () {
      let self = this
      if (this.m_search_title.trim() === '') {
        return _.orderBy(this.m_libs, ['updateTime'], ['desc'])
      } else {
        return _.orderBy(this.m_libs, ['updateTime'], ['desc']).filter(function (lib) {
          return lib.title.indexOf(self.m_search_title) !== -1
        })
      }
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../scss/_varilables.scss";
  @import "../../../scss/components/_button.scss";
  .articles-header{
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
  .no-article{
    font-size: 16px;
    line-height: 50px;
    height:50px;
    text-align: center;
  }
  .search-wrap{
    margin-top:10px;
    .search-input{
      height:36px;
      border:1px solid #ddd;
      outline:none;
      width:300px;
      padding-left: 5px;
      padding-right: 40px;
      font-size: 14px;
      border-radius: 4px;
      &:focus{
        border-color: $bingyan-color;
      }
    }
  }
  .release-button-wrap{
    margin-top: 30px;
  }
  .button{
    display: inline-block;
    width:120px;
    height:36px;
    line-height: 36px;
    border: 1px solid $bingyan-color;
    cursor: pointer;
    color:#fff;
    background-color: $bingyan-color;
    &:hover{
      background-color: darken($bingyan-color,5%);
    }
  }
  .articles-wrap{
    margin-top: 30px;
  }
  .article-item{
    padding:15px 0;
    border-bottom: 1px solid #eee;
    position: relative;
    .article-cover{
      height:100px;
      width:150px;
      border-radius: 2px;
    }
    .article-info{
      position: absolute;
      left:170px;
      top:15px;
      height:100px;
      width:200px;
      .article-title{
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        line-height: 1;
        vertical-align: top;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
      .article-intro{
        width:100%;
        display: inline-block;
        position: absolute;
        bottom:0;
        left:0;
        color:#666;
        vertical-align: text-bottom;
      }
    }
    .time-wrap{
      height:100px;
      position: relative;
      color:#999;
      min-width: 100px;
      text-align: right;
      .operation-wrap{
        position: absolute;
        bottom:0;
        right:0;
        span{
          &.cancel{
            margin-left: 20px;
          }
          cursor: pointer;
          &:hover{
            color:$bingyan-color;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
