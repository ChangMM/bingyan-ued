<template>
  <div id="wall-paper">
    <video v-show="m_wallpaper_type == 'video'" :class="{'enable': this.m_loaded}" ref="video" :src="m_video_src" class="video" id="video" autoplay loop></video>
    <div v-show="m_wallpaper_type == 'image'" class="image" :style="{ backgroundImage: 'url('+ this.m_image_src +')'}"></div>
</div>
</template>
<script>
/* global Image:true */
import _ from 'lodash'
import Status from '../Status.js'
export default {
  name: 'wall-paper',
  data: () => ({
    m_videoH: 0,
    m_videoW: 0,
    m_loaded: false,
    m_wallpaper_type: 'video',
    m_video_src: 'https://image.bingyan.net/video/21.mp4',
    m_image_src: 'https://image.bingyan.net/wallpaper/6.jpg'
  }),
  mounted () {
    this.f_init_config()
    Status.$on('wallpaper', (obj) => {
      this.m_wallpaper_type = obj.type
      if (this.m_wallpaper_type === 'video') {
        this.m_video_src = 'https://image.bingyan.net/video/' + obj.id + '.mp4'
        this.$refs.video.oncanplay = () => {
          this.f_resize_video_size(this.$refs.video, this.$refs.video.videoWidth, this.$refs.video.videoHeight)
        }
      } else {
        this.m_image_src = 'https://image.bingyan.net/wallpaper/' + obj.id + '.jpg'
        this.f_init_image()
      }
    })
  },
  methods: {
    f_init_config () {
      this.f_init_wallpaper()
    },
    f_init_wallpaper () {
      this.m_loaded = false
      if (this.m_wallpaper_type === 'video') {
        this.f_init_video()
      } else if (this.m_wallpaper_type === 'image') {
        this.f_init_image()
      }
    },
    f_init_image () {
      let image = new Image()
      image.src = this.m_image_src
      image.onload = () => {
        this.m_loaded = true
      }
    },
    f_init_video () {
      let checkVideoLoaded = () => {
        if (this.$refs.video && this.$refs.video.readyState === 4) {
          this.m_videoW = this.$refs.video.videoWidth
          this.m_videoH = this.$refs.video.videoHeight
          this.m_loaded = true
          this.f_resize_video_size(this.$refs.video, this.m_videoW, this.m_videoH)
          window.onresize = _.debounce(() => {
            this.f_resize_video_size(this.$refs.video, this.m_videoW, this.m_videoH)
          }, 300)
        } else {
          setTimeout(checkVideoLoaded, 50)
        }
      }
      checkVideoLoaded()
    },
    f_resize_video_size (video, videoW, videoH) {
      let windowW = 1200
      let windowH = 691
      if (windowH / windowW > videoH / videoW) {
        video.style.height = windowH + 'px'
        video.style.width = videoW * windowH / videoH + 'px'
      } else {
        video.style.width = windowW + 'px'
        video.style.height = videoH * windowW / videoW + 'px'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#wall-paper{
  position: absolute;
  top:0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  #loading{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 1;
    background-color: rgb(244,244,244);
    transition: all ease 0.2s;
    &.disable{
      opacity: 0;
    }
  }
  .video{
    position: absolute;
    transition: all ease 0.3s;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    &.enable{
      opacity: 1;
    }
  }
  .image{
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
