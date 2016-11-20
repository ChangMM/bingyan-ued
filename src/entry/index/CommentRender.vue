<template lang="html">
  <div class="comment-wrap">
    <template v-if="comments.length!==0">
      <p class="comment-header">已有 <span class="num">{{ comments.length }}</span> 条评论</p>
      <!-- 评论区-->
      <div class="comment-item" v-for='(comment, index) in comments'>
        <img v-bind:src="comment.commenter_avatar" class="commenter-avatar" alt="评论者头像"/>
        <p class="name-and-time">
          <span class="commenter-name"><span class="em">{{index+1}}楼</span> · {{comment.commenter_name}}</span> · <span class="commenter-time">{{comment.comment_time | timestampFormat}}</span>
        </p>
        <p class="commenter-content" v-html="comment.comment_content">
          <!-- {{comment.comment_content | emojiFormat}} -->
        </p>
      </div>
    </template>
    <template v-else>
      <p class="comment-header">暂时没有评论</p>
      <div class="no-comments">
        <img class="emoji" src="http://newbbs.bingyan.net/assets/emojis/point_right.png"></img>
        <img class="emoji" src="http://newbbs.bingyan.net/assets/emojis/point_right.png"></img>
        快来抢沙发吧
        <img class="emoji" src="http://newbbs.bingyan.net/assets/emojis/see_no_evil.png"></img>
        <img class="emoji" src="http://newbbs.bingyan.net/assets/emojis/point_left.png"></img>
        <img class="emoji" src="http://newbbs.bingyan.net/assets/emojis/point_left.png"></img>
      </div>
    </template>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['comments', 'refresh'],
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
@import '../../scss/_varilables.scss';
.comment-wrap{
  margin-top: 30px;
  img.emoji{
    height:16px !important;
    width:16px !important;
    vertical-align: -4px;
  }
  .comment-header{
    padding:5px 0;
    font-size: 16px;
    color: $baseTextColor;
    .num{
      color: $bingyan-color;
    }
  }
  .no-comments{
    text-align: center;
    height:40px;
    line-height: 40px;
  }
  .comment-item{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 42px;
    position: relative;
    border-bottom:1px solid #eee;
    &:last-child{
      border-bottom: none;
    }
  }
  .commenter-avatar{
    top:10px;
    left:0;
    height:34px;
    width:34px;
    border-radius: 50%;
    position: absolute;
  }
  .name-and-time{
    line-height: 24px;
    color:$baseTextColor;
    font-size: 12px;
    .em{
      color: $bingyan-color;
    }
  }
  .commenter-content{
    color: #444;
    font-size: 14px;
  }
}

</style>
