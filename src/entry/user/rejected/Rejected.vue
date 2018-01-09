<template lang="html">
  <div class="articles-wrap">
    <div class="articles-header">
      被拒绝的作品
      <div class="line"></div>
    </div>
    <div class="search-wrap clearfix">
      <input type="text" class="search-input" v-model="m_search_title" placeholder="支持搜索标题/文章类别">
      <a href="/new"><span class='button float-right'>新建作品</span></a>
    </div>
    <div class="articles-wrap">
      <template v-if="m_libs!=0">
        <div class="article-item clearfix" v-for="lib in orderedLibs">
          <span v-bind:class="['article-type',lib.category.toLowerCase()]">{{lib.category_full_name}}</span>
          <img v-bind:src="lib.cover?lib.cover:m_default_cover" class="article-cover" alt="封面图" />
          <div class="article-info">
            <span class="article-title">{{lib.title}}</span>
            <span class="article-intro">{{lib.intro}}</span>
          </div>
          <div class="float-right info-wrap">
            <span class="data-info">{{lib.article_date | timeFormat}}</span>
            <p class="operation-wrap">
              <span class="action" v-on:click='f_edit_article(lib.article_id)'>编辑</span>
              <span class="action" v-on:click="f_cancel_article(lib.article_id)">删除</span>
            </p>
          </div>
        </div>
      </template>
      <template v-if="m_libs==0">
        <p class="no-article">
          <img src="https://newbbs.bingyan.net/assets/emojis/see_no_evil.png" class="emoji"/>
          暂无内容
          <img src="https://newbbs.bingyan.net/assets/emojis/see_no_evil.png" class="emoji"/>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      m_default_cover: '/static/img/default_cover.png',
      m_search_title: '',
      m_libs: []
    }
  },
  computed: {
    orderedLibs: function () {
      let self = this
      if (this.m_search_title.trim() === '') {
        return _.orderBy(this.m_libs, ['updateTime'], ['desc'])
      } else {
        return _.orderBy(this.m_libs, ['updateTime'], ['desc']).filter(function (lib) {
          return (lib.title.indexOf(self.m_search_title) !== -1) || (lib.category_full_name.indexOf(self.m_search_title) !== -1)
        })
      }
    }
  },
  mounted () {
    this.f_get_rejected_articles()
  },
  methods: {
    f_edit_article: function (articleId) {
      window.location.href = '/new?id=' + articleId
    },
    f_get_rejected_articles: function () {
      this.$http.get('/api/user/articles/rejected').then(function (response) {
        let body = response.body
        if (body.status === 1) {
          this.m_libs = body.data
        }
      })
    },
    f_cancel_article: function (articleId) {
      this.$confirm().then(function () {
        this.$http.post('/api/user/article/cancel', {
          article_id: articleId
        }).then(function (response) {
          let body = response.body
          if (body.status === 1) {
            this.$warn('删除成功', function () {
              this.f_get_rejected_articles()
            }.bind(this))
          } else {
            this.$warn(body.msg)
          }
        })
      }.bind(this))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/components/_button.scss";
@import "../../../scss/components/_user_article.scss";
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
}
</style>
