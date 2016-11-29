<template lang="html">
  <div class="preview-mask">
    <img src="../assets/close.png" v-on:click='f_close' class="close" />
    <div class="preview-wrap">
      <div class="by-article">
          <div class="by-article-header">
              <h1 class="by-article-title">{{ article.title || '预览文章的标题' }}</h1>
              <div class="by-author-info">
                <img class="by-avatar" v-bind:src="article.author_picture || require('../assets/logo.png')" alt="作者头像"/>
                <p class="name-and-time">
                  <a href="#" class="article-author author-name">{{ article.author_name || '佚名' }}</a>
                  ·
                  <span class="article-time">{{ (article.check_date || '1994/12/10') | timeFormat }}</span>
                  ·
                  <span class="comment-num">{{ article.comment_num || 0 }}评论</span>
                  <span class="like-num">{{ article.like_num || 0 }}喜欢</span>
                  <span class="share-num">{{ article.share_num || 0 }}分享</span>
                </p>
                <span :class="'article-type '+ (article.category || 'fe').toLowerCase() ">{{ article.category_full_name || 'FE 前端' }}</span>
              </div>
          </div>
          <div class="by-article-content simditor-article" v-html="article.content || '这是文章的预览内容'"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      m_article_id: null,
      m_article_title: '预览文章标题',
      m_article_date: '2014/12/12',
      m_check_date: '2014/12/12',
      m_author_name: '子矜',
      m_author_picture: null,
      m_share_num: 0,
      m_comment_num: 0,
      m_like_num: 0,
      m_article_cover: '',
      m_article_content: '测试内容',
      m_category_full_name: '前端 FE',
      m_category: 'fe'
    }
  },
  props: ['article'],
  methods: {
    f_close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_varilables.scss';
@import '../scss/_mixin.scss';
@import '../scss/editor/editor_article.scss';
.preview-mask{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: 9997;
  transition: background ease .6s;
  background: rgba(255, 255, 255, 0.9);
  .close{
    height:20px;
    cursor: pointer;
    position: absolute;
    top:40px;
    right:60px;
  }
}
.preview-wrap{
  width:650px;
  padding: 30px;
  margin:40px auto 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 20px rgba(0,0,0,0.05),
              -1px -1px 20px rgba(0,0,0,0.05);
}
.by-article{
  height:560px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
  }
  &::-webkit-scrollbar-track {
    border:1px solid #eee;
  }
}
//文章头部
.by-article-header{
  position: relative;
  border-bottom: 1px solid lighten($light-black,35%);
  .by-article-title{
    line-height:60px;
    font-size: 24px;
    font-weight: bold;
  }
  .by-author-info{
    color:$baseTextColor;
    height: 50px;
    line-height: 50px;
    .by-avatar{
      width:40px;
      height:40px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .name-and-time{
      display: inline-block;
      height:50px;
      .author-name{
        color:$bingyan-color;
      }
      .article-time,.comment-num,.like-num,.share-num{
        font-size: 12px;
      }
    }
    .article-type{
      float: right;
      color:#fff;
      padding:0 8px;
      margin-top: 13px;
      line-height: 2;
      font-size: 12px;
      text-align: center;
      border-radius: 2px;
      @each $item,$color in $nav-list{
        &.#{$item}{
          background-color: $color;
        }
      }
    }
  }
}
// 文章内容区
.by-article-content{
  padding-top:20px;
}
</style>
