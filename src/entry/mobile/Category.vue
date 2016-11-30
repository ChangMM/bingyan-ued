<template lang="html">
  <div class="">
    <div class="articles-wrap">
      <div class="article mobile-article" v-for='article in m_articles'>
        <router-link :to="{ path: '/article/'+ article.article_id }">
          <img :src="article.cover" class="article-img" alt="文章名"/>
        </router-link>
        <router-link :to="{ path: '/category/'+ article.category.toLowerCase() }" :class="'article-type ' + article.category.toLowerCase()">{{article.category_full_name}}</router-link>
        <div class="article-info">
          <h1 class="article-title">
            <router-link :to="{ path: '/article/'+ article.article_id }">{{article.title}}</router-link>
          </h1>
          <div class="article-footer clearfix">
            <p class="right">
              <span>{{article.like_num}}喜欢</span> · <span>{{article.comment_num}}评论</span>
            </p>
            <p class="left">
              <span class="name">{{article.author_name}}</span> · <span class="time">{{article.check_date || timeFormat}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-wrap" v-show="m_loading">
      <img src="../../assets/loading.gif" class="loading" alt="加载中">
    </div>
    <div class="more-wrap">
      <span class="button more-button">加载更多</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      m_loading: true,
      m_articles: []
    }
  },
  mounted () {
    this.f_get_articles()
  },
  watch: {
    '$route': 'f_get_articles'
  },
  methods: {
    f_get_articles: function () {
      let type = this.$route.params.type
      this.$http.get('/api/category/' + type).then(function (response) {
        let body = response.body
        this.m_articles = body.data
        this.m_loading = false
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../scss/_varilables.scss';
@import '../../scss/components/_button.scss';
.articles-wrap{
  background-color: #f8f9fb;
  padding-bottom: 1px;
  .article{
    position: relative;
    margin-bottom: 20px;
    .article-img{
      width:100%;
    }
    //文章类型
    .article-type{
      padding:5px 8px;
      position: absolute;
      left: 4px;
      top: 4px;
      color:#fff;
      font-size: 14px;
      text-align: center;
      border-radius:1px;
      @each $item,$color in $nav-list{
        &.#{$item}{
          background-color: $color;
        }
      }
    }
    .article-info{
      position: relative;
      z-index: 1;
      margin-top: -40px;
      background-color: #fff;
      padding: 10px;
      .article-title{
        font-size: 18px;
      }
      .article-footer{
        margin-top: 5px;
        font-size: 12px;
        color:#999;
        .name{
          color:$bingyan-color;
          font-size: 14px;
        }
        .left{
          float:left;
        }
        .right{
          float: right;
        }
      }
    }
  }
}
.loading-wrap{
  background-color: #f8f9fb;
  text-align: center;
  .loading{
    height:60px;
  }
}
.more-wrap{
  background-color: #f8f9fb;
  text-align: center;
  padding-bottom: 20px;
  .more-button{
    width:80%;
    border-radius: 4px;
    line-height: 40px;
    height:40px;
    color: $bingyan-color;
    border:1px solid $bingyan-color;
    &:active{
      background-color: $bingyan-color;
      color: #fff;
    }
  }
}
</style>
