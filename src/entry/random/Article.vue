<template>
  <div class="article-page" id="random-article">
    <div class="page-top"></div>
    <div class="page-bottom"></div>
    <div class="article-wrap">
      <img src="/static/img/loading.gif" v-if="m_title == ''" class="loading-img" alt="加载中">
      <h1 class="article-title">{{m_title}}</h1>
      <p class="article-author">{{m_author}}</p>
      <div class="article-content" v-html="m_content"></div>
    </div>
    <div class="button-wrap">
      <span class="button" v-on:click="f_get_random">再来一篇</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'artile',
  data () {
    return {
      m_title: '',
      m_author: '',
      m_content: ''
    }
  },
  mounted () {
    this.f_get_article()
  },
  watch: {
    '$route': ['f_get_article']
  },
  methods: {
    f_get_article: function () {
      this.$http.get('/api/daily').then(function (response) {
        let body
        try {
          body = JSON.parse(response.body)
        } catch (err) {
          body = response.body
        }
        this.m_title = body.data.title
        this.m_author = body.data.author
        this.m_content = body.data.content
      })
    },
    f_get_random: function () {
      this.$http.get('/api/random').then(function (response) {
        let body
        try {
          body = JSON.parse(response.body)
        } catch (err) {
          body = response.body
        }
        this.m_title = body.data.title
        this.m_author = body.data.author
        this.m_content = body.data.content
      })
    }
  }
}
</script>
<style lang="scss">
#random-article{
  top:10px;
  left:10px;
  right:10px;
  bottom:30px;
  position: absolute;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 0 20px #CCC;
  box-sizing: border-box;
  padding:20px 20px 50px;
  background-color: #fff;
  .page-top{
    top:0;
    left:0;
    right:0;
    height: 40px;
    z-index: 1;
    border-radius: 4px;
    position: absolute;
    background-image: -webkit-linear-gradient(top, #fff, rgba(255,255,255,0));
  }
  .page-bottom{
    right:0;
    left:0;
    bottom:50px;
    height: 30px;
    z-index: 1;
    position: absolute;
    background-image: -webkit-linear-gradient(bottom, #fff, rgba(255,255,255,0));
  }
  .article-wrap{
    position: relative;
    background-color: #fff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .loading-img{
      position: absolute;
      top:160px;
      width: 50px;
      border-radius: 4px;
      left:0;
      right:0;
      margin: auto;
    }
    &::-webkit-scrollbar{
      width: 0px;
    }
    height: 100%;
    box-sizing: border-box;
    .article-title{
      text-align: center;
      font-size: 18px;
      font-weight: normal;
    }
    .article-author{
      color: #666;
      text-align: center;
      font-size: 15px;
      padding: 10px;
      border-bottom: 1px dashed #eee;
    }
    .article-content{
      color: #555;
      font-size: 15px;
      line-height: 1.6;
      margin-top: 10px;
      p{
        margin: 10px 0;
        text-align: justify;
        text-indent: 2em;
      }
    }
  }
  .button-wrap{
    position: absolute;
    height: 50px;
    left:20px;
    right:20px;
    bottom: 0;
    border-top: 1px solid #f4f4f4;
    text-align: center;
    line-height: 50px;
    .button{
      width: 100px;
      height: 28px;
      color: #666;
      line-height: 28px;
      border-radius: 4px;
      display: inline-block;
      background-color: #f4f4f4;
      border: 1px solid #eee;
      font-size: 12px;
      &:active{
        background-color: darken(#f4f4f4, 5%);
      }
    }
  }
}
</style>
