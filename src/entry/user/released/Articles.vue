<template lang="html">
  <div class="articles-wrap">
    <template v-if="published.length!=0">
      <div class="article-item clearfix" v-for="article in orderedPublished">
        <span v-bind:class="['article-type',article.category.toLowerCase()]">{{article.category_full_name}}</span>
        <img v-bind:src="article.cover?article.cover:m_default_cover" class="article-cover" alt="封面图" />
        <div class="article-info">
          <span class="article-title">{{article.title}}</span>
          <span class="article-intro">{{article.intro}}</span>
        </div>
        <div class="float-right info-wrap">
          <span class="data-info">{{article.like_num}}赞·{{article.comment_num}}阅读·{{article.share_num}}分享·{{article.article_date | timeFormat}}</span>
          <p class="operation-wrap">
            <span class="action">删除</span>
          </p>
        </div>
      </div>
    </template>
    <template v-if="published.length==0">
      <p class="no-article">
        <img src="http://newbbs.bingyan.net/assets/emojis/see_no_evil.png" class="emoji"/>
        暂无内容
        <img src="http://newbbs.bingyan.net/assets/emojis/see_no_evil.png" class="emoji"/>
      </p>
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
@import '../../../scss/components/_user_article.scss';
</style>
