<template lang="html">
  <div class="release-wrap">
    <div class="release-header">
      已发布的作品
      <div class="line"></div>
      <span class="tip">要知道
        <img src="http://newbbs.bingyan.net/assets/emojis/point_right.png" class="emoji"/>
        <img src="http://newbbs.bingyan.net/assets/emojis/point_right.png" class="emoji"/>
        我们可是要做最好的互联网团队博客的
        <img src="http://newbbs.bingyan.net/assets/emojis/see_no_evil.png" class="emoji"/>
      </span>
    </div>
    <div class="search-wrap clearfix">
      <input type="text" class="search-input" v-model="m_search_title" placeholder="支持搜索标题/文章类别">
      <a href="/new"><span class='button float-right'>新建作品</span></a>
    </div>
    <Articles :published='m_released' :search='m_search_title' :refresh='f_get_released_articles'></Articles>
  </div>
</template>

<script>
import Articles from './Articles'
export default {
  data () {
    return {
      m_search_title: '',
      m_released: []
    }
  },
  mounted () {
    this.f_get_released_articles()
  },
  methods: {
    f_get_released_articles: function () {
      this.$http.get('/api/user/articles/checked').then(function (response) {
        let body = response.body
        if (body.status === 1) {
          this.m_released = body.data
        }
      })
    }
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
