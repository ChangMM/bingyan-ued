// 添加一些全局工具函数
/* eslint no-extend-native: ["error",{ "exceptions": ["String"] }] */
export default function (Vue) {
  String.prototype.gblen = function () {
    var len = 0
    for (var i = 0; i < this.length; i++) {
      if (this.charCodeAt(i) > 127 || this.charCodeAt(i) === 94) {
        len += 2
      } else {
        len++
      }
    }
    return len
  }

  Vue.prototype.$checkCategoryRouter = function (route) {
    let routes = ['pm', 'vd', 'id', 'fe', 'rd']
    if (routes.indexOf(route) === -1) {
      return false
    } else {
      return true
    }
  }

  Vue.prototype.$getSelectTextById = function (element) {
    let E = document.getElementById(element)
    let selection = window.getSelection()
    let range = document.createRange()
    range.selectNodeContents(E)
    selection.removeAllRanges()
    selection.addRange(range)
    let text = window.getSelection().toString()
    selection.removeAllRanges()
    return text
  }

  Vue.prototype.$removeReturn = function (str) {
    return str.replace(/[\r\n]/g, '')
  }

  Vue.prototype.$cookies = function () {
    let ret = {}
    if (document.cookie.length === 0) {
      return ret
    }
    let pairs = document.cookie.split(';')
    for (let i = 0; i < pairs.length; i++) {
      let kv = pairs[i].split('=')
      ret[kv[0].trim()] = kv[1]
    }
    return ret
  }

  Vue.prototype.$parseUrl = function (url) {
    let a = document.createElement('a')
    a.href = url
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function () {
        let ret = {}
        let seg = a.search.replace(/^\?/, '').split('&')
        let len = seg.length
        let s = []
        for (let i = 0; i < len; i++) {
          if (!seg[i]) { continue }
          s = seg[i].split('=')
          ret[s[0]] = s[1]
        }
        return ret
      })(),
      file: (a.pathname.match(/\/([^/?#]+)$/i) || ['', ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^/]+(.+)/) || ['', ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    }
  }

  Vue.prototype.$fixBody = function () {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  Vue.prototype.$fixNoBody = function () {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }
}
