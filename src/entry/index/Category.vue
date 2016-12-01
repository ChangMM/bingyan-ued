<template lang="html">
  <div>
    <div class="articles-wrap clearfix">
      <div class="ued-article" v-for="article in m_articles">
        <div class="article-img-wrap">
          <router-link :to="{ path: '/article/'+ article.article_id }">
              <img v-bind:src="article.cover" class="article-img" alt="文章名"/>
          </router-link>
          <router-link :to="{ path: '/category/'+ article.category.toLowerCase() }" v-bind:class="['article-type', article.category.toLowerCase()]">
            {{article.category_full_name}}
          </router-link>
        </div>
        <router-link :to="{ path: '/article/'+ article.article_id }">
          <h3 class="article-title">{{article.title | ellipsis(30) }}</h3>
        </router-link>
        <div class="author-info">
          <a href="javasript:void(0);"><img class="author-avatar" v-bind:src="article.author_picture" alt="author-name"/></a>
          <span class="name-and-time">
            <a href="javasript:void(0);"><span class="author-name" data-tooltip="测试hover效果">{{ article.author_name }}</span></a>
            <span class="article-time">{{ article.check_date | timeFormat}}</span>
          </span>
          <span class="like icon">
            <b class="iconfont icon-like1"></b>
            <b class="like-num">{{ article.like_num }}</b>
          </span>
          <span class="comment icon">
            <b class="iconfont icon-comment"></b>
            <b class="comment-num">{{ article.comment_num }}</b>
          </span>
        </div>
      </div>
    </div>
    <div class="loading-wrap" v-show="m_loading">
      <img src="../../assets/loading.gif" class="loading" alt="加载中">
    </div>
    <div class="more-wrap">
      <span class="button more-button" v-on:click="f_get_more">{{ m_more_wrod }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      NUM: 10,
      m_over: false,
      m_loading: true,
      m_more_wrod: '加载更多',
      m_articles: []
    }
  },
  computed: {},
  mounted () {
    this.f_get_articles()
  },
  watch: {
    '$route': ['f_get_articles', 'f_ajust_args']
  },
  methods: {
    f_judge_router: function () {
      let routes = ['all', 'pm', 'vd', 'id', 'fe', 'rd']
      let type = this.$route.params.type
      if (routes.indexOf(type) !== -1) {
        return true
      } else {
        return false
      }
    },
    f_ajust_args: function () {
      this.m_loading = true
      this.m_over = false
      this.m_more_wrod = '加载更多'
    },
    f_get_more: function () {
      if (this.m_over) {
        return
      }
      let type = this.$route.params.type
      this.m_more_wrod = '正在加载文章...'
      this.$http.get('/api/category/' + type, {
        params: {
          offset: this.m_articles.length,
          num: this.NUM
        }
      }).then(function (response) {
        let body = response.body
        if (body.status === 1) {
          if (body.data.length === 0) {
            this.m_over = true
            this.m_more_wrod = '没有更多文章了'
          } else {
            this.m_articles = this.m_articles.concat(body.data)
            this.m_more_wrod = '更多文章'
          }
        } else {
          this.$warn(body.msg)
        }
      })
    },
    f_get_articles: function () {
      if (!this.f_judge_router()) {
        this.$router.replace('/404')  // 这个要用replace 而不是push
      }
      let type = this.$route.params.type
      this.$http.get('/api/category/' + type).then(function (response) {
        let body = response.body
        this.m_articles = body.data
        this.m_loading = false
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../../scss/_varilables.scss';
@import '../../scss/components/_button.scss';
@import '../../scss/_mixin.scss';
$article-width: 300px;
$article-img-height: 200px;
.articles-wrap{
  padding-top: 10px;
  margin-right: -50px;
}
.no-articles{
  height:40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
}
//文章块的样式
.ued-article{
  position: relative;
  float:left;
  margin-bottom:30px;
  border-radius: 2px;
  margin-right: 50px;
  width: $article-width;
  background-color: #f8f9fb;
  @include transition-ease;
  &:hover{
    box-shadow: 2px 2px 3px #eee, -2px -2px 3px #eee;
  }
}
//文章封面
.article-img-wrap{
  position: relative;
  font-size: 0;
  overflow: hidden;
  .article-img{
    width:$article-width;
    height: $article-img-height;
    vertical-align: middle;
    @include transition-ease;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    &:hover{
      -webkit-transform: scale(1.2);
      -moz-transform: scale(1.2);
      transform: scale(1.2);
    }
  }
}
//文章类型
.article-type{
  padding:0 8px;
  position: absolute;
  left: 10px;
  top:0;
  font-size: 14px;
  color:#fff;
  text-align: center;
  border-radius: 2px;
  @each $item,$color in $nav-list{
    &.#{$item}{
      background-color: $color;
    }
  }
}
//文章标题
.article-title{
  padding: 6px 10px;
  line-height: 1.5;
  font-size: 14px;
  display: inline-block;
  height:42px;
  vertical-align: bottom;
  &:hover{
    text-decoration: underline;
  }
}
//底部作者信息
.author-info{
  font-size: 12px;
  padding:0 10px;
  height:48px;
  line-height: 48px;
  .author-avatar{
    width:34px;
    height:34px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .name-and-time{
    height:48px;
    width:160px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    .article-time,.author-name{
      left:0;
      line-height: 20px;
      position: absolute;
    }
    .author-name{
      top:6px;
      color:$bingyan-color;
    }
    .article-time{
      top:26px;
      color:$light-black;
    }
  }
  .icon{
    float:right;
    color:$light-black;
    display: inline-block;
    vertical-align: middle;
    padding-left: 5px;
    .iconfont{
      font-size: 12px;
      font-weight: normal;
      margin-right: -2px;
      &.icon-like1{
        vertical-align: 1px;
      }
    }
    .fa{
      margin-right: -3px;
    }
  }
}
.more-wrap{
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
  .more-button{
    width:200px;
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
.loading-wrap{
  text-align: center;
  .loading{
    height:60px;
  }
}
</style>
