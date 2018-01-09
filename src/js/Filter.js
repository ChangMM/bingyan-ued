// 添加一些常用的过滤函数
export default function (Vue) {
  if (Vue) {
    // 溢出省略的处理
    Vue.filter('ellipsis', function (value, maxLength) {
      if (value.length > maxLength) {
        return value.substr(0, maxLength - 2) + '...'
      } else {
        return value
      }
    })

    Vue.filter('toLowerCase', function (value) {
      return value.toLowerCase()
    })

    Vue.filter('toUpperCase', function (value) {
      return value.toUpperCase()
    })
    // 计算字符串的长度
    Vue.filter('len', function (value) {
      if (typeof value === 'string') {
        return value.length
      } else {
        return 0
      }
    })
    // 处理时间
    Vue.filter('timeFormat', function (value) {
      return value.substr(0, 10).replace(/-/g, '/')
    })
    // 处理时间
    Vue.filter('timestampFormat', function (value) {
      let date = new Date(value)
      let year = date.getYear() + 1900
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '/' + month + '/' + day
    })
    // 处理评论区的表情
    Vue.filter('emojiFormat', function (value) {
      return value.replace(/:([a-z_]+):/g, function (str, $1) {
        return '<img src="https://newbbs.bingyan.net/assets/emojis/' + $1 + '.png" class="emoji" title="' + str + '">'
      })
    })
  }
}
