<template lang="html">
  <div class="articles-wrap">
    <template v-if="published.length!=0">
      <div class="article-item clearfix" v-for="article in orderedPublished">
        <img v-bind:src="article.cover?article.cover:m_default_cover" class="article-cover" alt="封面图" />
        <div class="article-info">
          <span class="article-title">{{article.title}}</span>
          <span class="article-intro">{{article.digest}}</span>
        </div>
        <div class="float-right time-wrap">
          <span class="article-time">{{article.updateTime | timestampFormat}}</span>
          <span class="cancel">删除</span>
        </div>
      </div>
    </template>
    <template v-if="published.length==0">
      <p class="no-article">暂无内容</p>
    </template>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      m_default_cover: require('../../../assets/default_cover.png')
    }
  },
  computed: {
    orderedPublished: function () {
      return _.orderBy(this.published, ['updateTime'], ['desc'])
    }
  },
  props: ['published'],
  methods: {}
}
</script>
<style lang="scss" scoped>
@import '../../../scss/_varilables.scss';
.no-article{
  font-size: 16px;
  line-height: 50px;
  height:50px;
  text-align: center;
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
    text-align: right;
    min-width: 100px;
    .cancel{
      cursor: pointer;
      position: absolute;
      bottom:0;
      right:0;
      &:hover{
        color:$bingyan-color;
        text-decoration: underline;
      }
    }
  }
}
</style>
