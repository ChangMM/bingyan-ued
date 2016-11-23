<template lang="html">
  <div class="articles-wrap clearfix">
    <template v-if='m_articles.length === 0'>
      <p class="no-articles">尚未发布任何文章：(</p>
    </template>
    <template v-else>
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
            <b class="fa fa-heart-o"></b>
            <b class="like-num">{{ article.like_num }}</b>
          </span>
          <span class="comment icon">
            <b class="fa fa-comment-o"></b>
            <b class="comment-num">{{ article.comment_num }}</b>
          </span>
        </div>
      </div>
    </template>

  </div>

</template>

<script>
export default {
  data () {
    return {
      m_articles: []
    }
  },
  computed: {},
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
        let body
        try {
          body = JSON.parse(response.body)
        } catch (err) {
          // console.warn(说明返回的已经是以json的格式的了)
          body = response.body
        }
        this.m_articles = body.data
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import '../../scss/_varilables.scss';
@import '../../scss/_mixin.scss';
$article-width: 300px;
$article-img-height: 200px;
.articles-wrap{
  padding-top: 30px;
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
    .fa{
      margin-right: -3px;
    }
  }
}
</style>
