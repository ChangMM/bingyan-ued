<template lang="html">
  <div class="NotFound">
    <img src="/static/img/404.png" class="img-404" alt="not found">
    <p class="word-404">404</p>
    <blockquote cite="https://zh.wikipedia.org/wiki/加爾各答德肋撒修女">
      即使你把你最好的都给了这个世界，可能还是远远不够。无论如何，你还是要把你最好的给这个世界。
      <span class="q-footer">特蕾莎修女</span>
    </blockquote>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.NotFound{
  padding-top:40px;
  margin-bottom: 40px;
  text-align: center;
  img{
    width:150px;
  }
  .word-404{
    font-size: 80px;
    font-weight: bold;
    color: #FCAE26;
    line-height: 1.2;
    padding: 20px 0;
  }
  blockquote{
    position: relative;
    display: inline-block;
    width: 80%;
    color:#999;
    text-align: left;
    padding: 10px 10px 16px 20px;
    border-left: 4px solid #ddd;
    .q-footer{
      line-height: 1;
      position: absolute;
      right:10px;
      color: #333;
      bottom:0;
      font-size: 12px;
      &:before{
        content: '-- '
      }
    }
  }
}
</style>
