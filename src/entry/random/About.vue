<template>
  <div id="about">
    <p class="title">关于我们</p>
    <div class="content">
      <ol>
        <li>
          <p class='label'>这是个什么东西？</p>
          <p class="intro">每天随机推荐一篇散文。</p>
        </li>
        <li>
          <p class='label'>为什么要做这个东西？</p>
          <p class="intro">太闲了。</p>
        </li>
        <li>
          <p class='label'>不是有类似的东西吗？</p>
          <p class="intro">是的，但我觉得类似的产品上面文字的越来越矫情了，就又做了一个。</p>
        </li>
        <li>
          <p class='label'>有什么意义？</p>
          <p class="intro">对我而言，就权当消磨时间了，对读者而言，就按每天一篇 1000 字，一年 300 天来说，一年可以大概有 30 万字的阅读量，不多也不少。</p>
        </li>
        <li>
          <p class='label'>有更好的文章？</p>
          <p class="intro">
            可以
            <a href="https://wj.qq.com/s/1812183/1304/" target="https://wj.qq.com/s/1812183/1304/">点这里</a>
            推荐。
          </p>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  name: 'about',
  data: () => ({})
}
</script>
<style lang="scss" scoped>
#about{
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
  .title{
    text-align: center;
    font-size: 18px;
    font-weight: normal;
  }
  .content{
    padding: 10px 15px;
    .label{
      color: #333;
      margin-bottom: 4px;
      margin-top: 10px;
    }
    a{
      color: #fcae26;
      text-decoration: underline;
    }
    .intro{
      color: #666;
      font-size: 13px;
      text-align: justify;
    }
  }
}
</style>
