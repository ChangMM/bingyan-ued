<template lang="html">
  <div>
    <div class="articles-header">
      待审核的作品
      <div class="line"></div>
    </div>
    <div class="search-wrap">
      <input type="text" class="search-input" v-model="m_search_title" placeholder="支持标题/作者名/文章类别搜索">
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
            <span class="data-info">
              <span class="author-name">{{lib.author_name}}</span>
              {{lib.article_date | timeFormat}}</span>
            <p class="operation-wrap">
              <span class="action" v-on:click="f_preview_article(lib.article_id)">预览</span>
              <span class="action" v-on:click="f_pass_article(lib.article_id)">通过</span>
              <span class="action" v-on:click="f_reject_article(lib.article_id)">拒绝</span>
            </p>
          </div>
        </div>
      </template>
      <template v-if="m_libs==0">
        <p class="no-article">
          <img src="http://newbbs.bingyan.net/assets/emojis/see_no_evil.png" class="emoji"/>
          暂无内容
          <img src="http://newbbs.bingyan.net/assets/emojis/see_no_evil.png" class="emoji"/>
        </p>
      </template>
    </div>
    <Preview v-show='m_preview' :article='m_preview_article' v-on:close='f_close_preview'> </Preview>
  </div>
</template>

<script>
import _ from 'lodash'
import Preview from '../../components/Preview.vue'
export default {
  data () {
    return {
      m_default_cover: '/static/img/default_cover.png',
      m_search_title: '',
      m_preview: false,
      m_preview_article: {},
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
          return (lib.title.indexOf(self.m_search_title) !== -1) || (lib.category_full_name.indexOf(self.m_search_title) !== -1) || (lib.author_name.indexOf(self.m_search_title) !== -1)
        })
      }
    }
  },
  mounted () {
    this.f_get_checking_articles()
  },
  methods: {
    f_close_preview: function () {
      this.m_preview = false
    },
    f_preview_article: function (articleId) {
      this.$http.get('/api/admin/article/' + articleId).then(function (response) {
        let body = response.body
        if (body.status === 1) {
          this.m_preview = true
          this.m_preview_article = body.data
        }
      })
    },
    f_get_checking_articles: function () {
      this.$http.get('/api/admin/articles/checking').then(function (response) {
        let body = response.body
        if (body.status === 1) {
          this.m_libs = body.data
        }
      })
    },
    f_pass_article: function (articleId) {
      this.$confirm().then(function () {
        this.$http.post('/api/admin/article/pass', {
          article_id: articleId
        }).then(function (response) {
          let body = response.body
          if (body.status === 1) {
            this.$warn('操作成功', function () {
              this.f_get_checking_articles()
            }.bind(this))
          } else {
            this.$warn(body.msg)
          }
        })
      }.bind(this))
    },
    f_reject_article: function (articleId) {
      this.$confirm().then(function () {
        this.$http.post('/api/admin/article/reject', {
          article_id: articleId
        }).then(function (response) {
          let body = response.body
          if (body.status === 1) {
            this.$warn('操作成功', function () {
              this.f_get_checking_articles()
            }.bind(this))
          } else {
            this.$warn(body.msg)
          }
        })
      }.bind(this))
    }
  },
  components: {
    Preview
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/components/_button.scss";
@import "../../scss/components/_user_article.scss";
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
}
.articles-wrap{
  margin-top: 30px;
}
</style>
