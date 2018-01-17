<template>
  <div id="image-choose">
    <div v-if="m_total > 0" class="image-item" v-for = "item,index in m_images">
      {{index}}
      <div class="mask" v-on:click="f_set_wallpaper(index+1)"></div>
      <a class="open" :href="item" target="_blank">
        <span class="tool-tip long">查看大图</span>
      </a>
      <img class="image" :src="item" alt="">
    </div>
    <div class="loading-wrap">
      <span v-if="this.m_cur_num < this.m_total" v-on:click="f_load_images" class="more-button">加载更多</span>
      <span v-if="this.m_cur_num >= this.m_total" class="none-button">没有更多了</span>
    </div>
  </div>
</template>
<script>
import Status from '../Status.js'
export default {
  name: 'image-choose',
  data: () => ({
    m_total: 0,
    m_images: [],
    m_cur_num: 0,
    m_per_num: 7
  }),
  mounted () {
    if (this.m_total === 0) {
      this.$http.get('/api/imagewall').then((res) => {
        this.m_total = res.body.data
        this.f_load_images()
      })
    }
  },
  methods: {
    f_load_images () {
      let cur = this.m_cur_num
      if (cur < this.m_total) {
        for (let i = 1; i < this.m_per_num; i++) {
          if (cur + i <= this.m_total) {
            this.m_images.push('https://image.bingyan.net/wallpaper/' + (cur + i) + '.jpg')
            this.m_cur_num ++
          } else {
            this.m_cur_num = this.m_total
            break
          }
        }
      }
    },
    f_set_wallpaper (id) {
      Status.$emit('wallpaper', {
        type: 'image',
        id: id
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.image-item{
  margin: 0 auto 15px;
  width: 94%;
  font-size: 0;
  position: relative;
  &:first-child{
    margin-top: 15px;
  }
  &:hover{
    .mask{
      background-color: rgba(0,0,0,0.2);
    }
  }
  .mask{
    top:0;
    left:0;
    width:100%;
    height: 100%;
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    background-color: rgba(0,0,0,0);
    transition: all ease 0.2s;
  }
  img{
    border-radius: 4px;
    border: 1px solid #eee;
    max-width: 100%;
  }
  .open{
    height: 20px;
    width: 20px;
    display: none;
    position: absolute;
    z-index: 2;
    top:8px;
    right:10px;
    cursor: pointer;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://image.bingyan.net/icons/eye.png');
    &:hover{
      background-image: url('https://image.bingyan.net/icons/eye-hover.png');
      .tool-tip{
        display: block;
      }
    }
    .tool-tip{
      left:-0px;
    }
  }
  .tool-tip{
    display: none;
    background-color: rgba(#000, 0.7);
    font-size: 12px;
    position: absolute;
    padding: 2px;
    border-radius: 2px;
    top: 24px;
    left:50%;
    transform: translateX(-50%);
    display: inline-block;
    color: #fff;
    text-align: center;
    z-index: 999;
    &.long{
      width: 66px;
    }
    width: 40px;
  }
  &:hover{
    .open{
      display: block;
    }
    .tool-tip{
      display: none;
    }
  }
}
.loading-wrap{
  text-align: center;
  margin-bottom: 15px;
  .more-button{
    cursor: pointer;
    display: inline-block;
    padding: 4px 10px;
    font-size: 12px;
    border: 1px solid #ccc;
    color: #555;
    border-radius: 2px;
    transition: background ease 0.2s;
    &:hover{
      background-color:#eee;
    }
    &:active{
      background-color:#ddd;
    }
  }
  .none-button{
    font-size: 12px;
    color: #555;
  }
}
</style>
