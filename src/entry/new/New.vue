<template lang="html">
  <div class="new-wrap base-width">
    <div class="bread-header">
      <img src="../../assets/return.png" v-on:click='f_return' class="return" alt="返回上一级" /> <span v-on:click='f_return' class="prev">作品管理/</span> <span class="now">新建作品</span>
    </div>
    <div class="brick-editor-wrap">
      <div class="editor-left">
        <div class="preview-ued-article">
          <!-- <p class="preview-tip tip">预览</p> -->
          <div class="article-img-wrap">
            <input type="file" v-on:change="f_cover" class="file-input">
            <img v-bind:src="m_cover?m_cover:m_cover_default"/>
            <p class="cover-tip" v-show="m_cover==''">点击上传封面</p>
            <span class="article-type" :class="m_category">{{m_category_full_name}}</span>
          </div>
          <h3 class="article-title">{{ m_title | ellipsis(32) }}</h3>
        </div>
        <div class="cover-wrap">
          <p class="cover-tip tip">类型</p>
          <div class="article-type-wrap" v-on:click="f_choose_type($event)">
            <span class="article-type pm" :class="{'active': m_category=='pm'}" data-category='pm'>PM 产品</span>
            <span class="article-type vd" :class="{'active': m_category=='vd'}" data-category='vd'>VD 视觉</span>
            <span class="article-type id" :class="{'active': m_category=='id'}" data-category='id'>ID 设计</span>
            <span class="article-type fe" :class="{'active': m_category=='fe'}" data-category='fe'>FE 前端</span>
            <span class="article-type rd" :class="{'active': m_category=='rd'}" data-category='rd'>RD 研发</span>
          </div>
        </div>
        <div class="abbr-cover">
          <p class="abbr-tip tip clearfix">摘要 <span class='float-right'>未填写自动抓取正文的前22个字</span></p>
          <textarea name="abbr" v-model="m_abbr" placeholder="请填写摘要" class="abbr-edit"></textarea>
          <span class="word-tip">{{ m_abbr | len }}/22</span>
        </div>
      </div>
      <div class="editor-main">
        <div class="btn-group">
          <span class="button save" v-on:click='f_save($event)'>保存</span>
          <span class="button view" v-on:click='f_preview'>预览</span>
        </div>
        <div class="title-wrap">
          <img src="../../assets/left.png" class="left" />
          <img src="../../assets/right.png" class="right" />
          <input type="text" class="title" v-model="m_title" placeholder="请在这里输入标题">
          <span class="word-tip">{{ m_title | len }}/32</span>
        </div>
        <textarea id="editor" spellcheck="false" placeholder="这里是正文" autofocus></textarea>
      </div>
    </div>
  </div>
</template>

<script>
/* global $:true, FormData:true, location:true, Simditor:true */
export default {
  data () {
    return {
      m_aid: '',
      m_cover: '',
      m_cover_default: require('../../assets/editBack.png'),
      m_category: '',
      m_category_full_name: '',
      m_title: '',
      m_abbr: '',
      m_preview: false,
      m_time: new Date(),
      m_content: '',
      m_editor: null
    }
  },
  mounted () {
    // 绑定页面退出事件
    $(window).bind('beforeunload', function () {
      return '您可能有数据没有保存'
    })
    this.f_init_editor()
    this.f_get_edit_content()
  },
  methods: {
    f_init_editor: function () {
      this.m_editor = new Simditor({
        textarea: $('#editor'),
        toolbar: ['title', 'bold', 'underline', 'color', '|', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image'],
        toolbarFloat: false,
        tabIndent: true,
        defaultImage: '/static/img/default_cover.png',
        upload: {
          url: '/api/upload',
          fileKey: 'upload_file',
          connectionCount: 3,
          leaveConfirm: '正在上传文件，如果离开上传会自动取消'
        },
        pasteImage: true,
        codeLanguages: [
          { name: 'Bash', value: 'bash' },
          { name: 'C++', value: 'c++' },
          { name: 'CSS', value: 'css' },
          { name: 'Less', value: 'less' },
          { name: 'Sass', value: 'sass' },
          { name: 'HTML', value: 'html' },
          { name: 'JSON', value: 'json' },
          { name: 'Java', value: 'java' },
          { name: 'JavaScript', value: 'js' },
          { name: 'Markdown', value: 'markdown' },
          { name: 'Objective C', value: 'oc' },
          { name: 'PHP', value: 'php' },
          { name: 'Python', value: 'python' },
          {name: 'SQL', value: 'sql'}
        ]
      })
    },
    f_get_edit_content: function () {
      let id = this.$parseUrl(location.href).params['id']
      if (id) {
        this.$http.get('/api/user/article/' + id).then((response) => {
          let body = response.body
          if (body.status === 1) {
            let data = body.data
            this.m_title = data.title
            this.m_abbr = data.intro
            this.m_content = data.content
            this.m_cover = data.cover
            this.m_aid = data.article_id
            this.m_category = data.category.toLowerCase()
            this.m_category_full_name = data.category_full_name
            // 填充文章内容
            this.m_editor.setValue(this.m_content)
          } else {
            this.$warn(body.msg)
          }
        })
      }
    },
    f_cover: function (event) {
      let file = event.target.files[0]
      if (['gif', 'jpg', 'jpeg', 'png'].indexOf(file.type.split('/')[1].toLowerCase()) === -1) {
        return this.$warn('图片格式只能为gif,jpg,jpeg和png')
      }
      if (file.size / 1024 > 2048) {
        return this.$warn('图片不能超过2M')
      }
      this.$warn('封面图片上传中')
      // 上传图片
      this.f_upload_cover(file).then((response) => {
        let body = response.body
        if (body.status === 1) {
          this.m_cover = body.data
        } else {
          this.$warn('上传失败')
        }
      })
    },
    // 上传图片的函数
    f_upload_cover: function (data) {
      var formData = new FormData()
      formData.append('upload_file', data)
      formData.append('ratio', 1.5)
      return this.$http.post('/api/upload', formData)
    },
    f_choose_type: function (e) {
      let currentTarget = e.currentTarget
      let target = e.target
      if (target === currentTarget) {
        return
      }
      if (currentTarget.querySelector('.article-type.active')) {
        currentTarget.querySelector('.article-type.active').classList.remove('active')
      }
      target.classList.add('active')
      this.m_category = target.dataset.category
      this.m_category_full_name = target.innerHTML
    },
    f_return: function () {
      location.href = '/user.html'
    },
    f_save: function (event) {
      this.m_content = this.m_editor.getValue()
      if (!this.f_check_article()) {
        return
      }
      let currentTarget = event.currentTarget
      if (currentTarget.classList.contains('disable')) {
        return
      } else {
        currentTarget.classList.add('disable')
        currentTarget.innerHTML = '正在保存'
        this.$http.post('/api/user/article/save', {
          article_id: this.m_aid,
          title: this.m_title,
          intro: this.m_abbr,
          cover: this.m_cover,
          content: this.m_content,
          category: this.m_category
        }).then((response) => {
          let body = response.body
          if (body.status === 1) {
            this.m_aid = body.data
            this.$warn('保存成功')
            currentTarget.innerHTML = '保存'
          } else {
            this.$warn('保存失败')
            currentTarget.innerHTML = '请重试'
          }
          currentTarget.classList.remove('disable')
        })
      }
    },
    f_save_release: function (event) {
      this.m_content = this.m_editor.getValue()
      if (!this.f_check_article()) {
        return
      }
      let self = this
      // 事件目标要及时保存
      let currentTarget = event.currentTarget
      this.$confirm().then(
        function (data) {
          if (currentTarget.classList.contains('disable')) {
            return
          } else {
            currentTarget.classList.add('disable')
            currentTarget.innerHTML = '正在发布'
            self.$http.post('/api/post', {
              aid: self.m_aid,
              csrf: self.$cookies()['csrf'] || '',
              title: self.m_title,
              digest: self.m_abbr,
              words: self.m_content,
              cover: self.m_cover
            }).then((response) => {
              let body = response.body
              if (body.error === 'ok') {
                self.f_release(body.post.id)
                currentTarget.innerHTML = '保存并发布'
              } else {
                self.$warn('发布失败')
                currentTarget.innerHTML = '请重试'
              }
              currentTarget.classList.remove('disable')
            })
          }
        })
    },
    f_release: function (pid) {
      this.$http.post('/api/publish/post', {
        pid: pid
      }).then((response) => {
        let body = response.body
        if (body.error === 'ok') {
          this.$warn('发布文章成功', function () {
            $(window).unbind('beforeunload')
            window.location.href = '/main#!/release'
          })
        } else {
          this.$warn('发布失败')
          this.$warn(body.msg)
        }
      })
    },
    f_preview: function () {
      this.m_content = this.m_editor.getValue()
      this.m_preview = true
      this.$fixBody()
    },
    f_check_article: function () {
      if (this.m_title.trim() === '') {
        this.$warn('文章标题为空')
        return false
      }
      if (this.m_title.trim().length > 32) {
        this.$warn('文章标题过长')
        return false
      }
      // 如果摘要为空摘要取正文前22个字符
      if (this.m_abbr.trim() === '') {
        // this.m_abbr = this.$removeReturn(this.$getSelectTextById('editor')).substr(0, 22)
        this.$warn('文章摘要不能为空')
        return false
      }
      if (this.m_abbr.trim().length > 22) {
        this.$warn('文章摘要过长')
        return false
      }
      if (this.m_cover === '') {
        this.$warn('文章封面为空')
        return false
      }
      if (this.m_content === '') {
        this.$warn('文章内容为空')
        return false
      }
      return true
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
  @import '../../scss/_mixin.scss';
  @import '../../scss/_varilables.scss';
  @import '../../scss/components/_button.scss';
  //新建文章的页面样式控制
  .new-wrap{
    margin:0 auto;
  }
  //面包导航
  .bread-header{
    margin-top: 30px;
    img.return{
      height:20px;
      vertical-align: middle;
      cursor: pointer;
    }
    span{
      &.prev{
        color: #666;
        cursor: pointer;
      }
      &.now{
        color:#000;
      }
    }
  }

  //编辑器主体样式
  .brick-editor-wrap{
    margin-top: 20px;
    padding-left: 300px;
    position: relative;
  }
  .editor-left{
    width:300px;
    position: absolute;
    top:0;
    left:0;
    .tip{
      padding-top:10px;
      font-weight: bold;
      span{
        font-size: 12px;
        color:#999;
        position: relative;
        top:4px;
      }
    }
    //预览的文章块的样式
    .preview-ued-article{
      position: relative;
      border-radius: 2px;
      .article-img-wrap{
        height: 200px;
        width:300px;
        position: relative;
        img{
          width:100%;
          height:100%;
          position: absolute;
          top:0;
          left:0;
          z-index: 0;
        }
        .cover-tip{
          width:100px;
          color: #999;
          height:20px;
          font-size: 12px;
          position: absolute;
          z-index: 1;
          left:0;
          right:0;
          bottom:12px;
          margin: auto;
        }
        input{
          cursor: pointer;
          opacity: 0;
          position: absolute;
          z-index: 2;
          top:0;
          left:0;
          width:100%;
          height:100%;
        }
      }
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
      .article-title{
        background-color: #f8f9fb;
        padding: 6px 10px;
        line-height: 1.5;
        font-size: 14px;
        height:42px;
      }
    }
    .article-type-wrap{
      width:320px;
      font-size: 0;
      .article-type{
        display: inline-block;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 6px;
        width:90px;
        color: #fff;
        text-align: center;
        background-color: #DDD;
        border-radius: 2px;
        margin-right: 15px;
        cursor: pointer;
        &.active{
          @each $item,$color in $nav-list{
            &.#{$item}{
              background-color: $color;
            }
          }
        }
      }
    }
    .abbr-wrap{
      position: relative;
    }
    // 摘要输入框
    .abbr-edit{
      margin-top: 4px;
      padding:5px;
      color:#666;
      height:60px;
      width:100%;
      box-sizing: border-box;
      border-radius: 2px;
      outline: none;
      resize: none;
      border:1px solid #ddd;
      &:focus{
        border-color: $bingyan-color;
      }
    }
    .word-tip{
      position: absolute;
      font-size: 12px;
      color:#999;
      right:2px;
      bottom:6px;
    }
  }
  .editor-main{
    padding-left:40px;
    position: relative;
    div[data-role="editor-toolbar"] {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .btn-group{
      position: absolute;
      top:6px;
      right:0;
      z-index: 2;
      .button{
        display: inline-block;
        width:80px;
        height:30px;
        font-size: 12px;
        line-height: 30px;
        border: 1px solid $bingyan-color;
        margin-left: 12px;
        &.firt-child{
          margin-left: 0;
        }
        &.save{
          color:$bingyan-color;
          &:hover{
            color:#fff;
            background-color: darken($bingyan-color,5%);
          }
        }
        &.release,&.view{
          color:#fff;
          background-color: $bingyan-color;
          &:hover{
            background-color: darken($bingyan-color,5%);
          }
        }
        &.disable{
          color: #fff;
          background-color: lighten($bingyan-color,10%);
          border-color: lighten($bingyan-color,10%);
        }
      }
    }
    .title-wrap{
      left:0;
      right:0;
      width:90%;
      margin: 30px auto 0;
      transform: translateX(20px);
      position: absolute;
      top:42px;
      z-index:2;
      .left{
        position: absolute;
        top:-16px;
        left:-16px;
      }
      .right{
        position: absolute;
        top:-16px;
        right:-16px;
      }
      .title{
        border:none;
        outline:none;
        box-sizing: border-box;
        width:100%;
        height:50px;
        font-size: 16px;
        color:#666;
        border-bottom: 1px solid #ddd;
        background-color: transparent;
        &:focus{
          border-color: $bingyan-color;
        }
      }
      .word-tip{
        position: absolute;
        bottom:16px;
        right:6px;
        color: #aaa;
        font-size: 12px;
      }
    }
    // #editor {
    //   width:90%;
    //   margin: 10px auto 0;
    // 	max-height: 600px;
    // 	height: 500px;
    // 	padding: 4px;
    //   color:#333;
    // 	box-sizing: border-box;
    // 	overflow-y: scroll;
    // 	outline: none;
    //   img{
    //     max-width:100%;
    //   }
    // }
    // #editor::-webkit-scrollbar {
    //   width: 6px;
    // }
    // #editor::-webkit-scrollbar-thumb {
    //   background-color: #ddd;
    // }
    // #editor::-webkit-scrollbar-track {
    //   border:1px solid #eee;
    // }
  }
</style>
