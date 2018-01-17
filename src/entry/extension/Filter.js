// 添加一些常用的过滤函数
let Filter = {}

function calLessTen (value) {
  if (value < 10) {
    return '0' + value
  } else {
    return '' + value
  }
}

Filter.install = function (Vue) {
  if (Vue) {
    Vue.filter('ellipsis', (value, maxLength) => {
      if (value.length > maxLength) {
        return value.substr(0, maxLength - 2) + '...'
      } else {
        return value
      }
    })

    Vue.filter('calLessTen', (value) => {
      if (value < 10) {
        return '0' + value
      } else {
        return value
      }
    })

    Vue.filter('timestamp', (date) => {
      let year = date.getYear() + 1900
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '/' + calLessTen(month) + '/' + calLessTen(day)
    })

    Vue.filter('week', (date) => {
      let day = date.getDay()
      let weekday = ''
      switch (day) {
        case 0:
          weekday = '周日'
          break
        case 1:
          weekday = '周一'
          break
        case 2:
          weekday = '周二'
          break
        case 3:
          weekday = '周三'
          break
        case 4:
          weekday = '周四'
          break
        case 5:
          weekday = '周五'
          break
        case 6:
          weekday = '周六'
          break
      }
      return weekday
    })
  }
}
export default Filter
