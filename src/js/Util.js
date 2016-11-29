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

  Vue.prototype.$encodeHtml = function (html) {
    let REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g
    return (typeof html !== 'string') ? html
    : html.replace(REGX_HTML_ENCODE, function ($0) {
      let c = $0.charCodeAt(0)
      let r = ['&#']
      c = (c === 0x20) ? 0xA0 : c
      r.push(c)
      r.push(';')
      return r.join('')
    })
  }

  Vue.prototype.$decodeHtml = function (html) {
    let REGX_HTML_DECODE = /&\w{1,};|&#\d{1,};/g
    let HTML_DECODE = {
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&nbsp;': ' ',
      '&quot;': '"',
      '&copy;': '©'
      // add more
    }
    return (typeof html !== 'string') ? html
    : html.replace(REGX_HTML_DECODE, function ($0) {
      let c = HTML_DECODE[$0]
      if (c === undefined) {
        let m = $0.match(/\d{1,}/)
        if (m) {
          let cc = m[0]
          cc = (cc === 0xA0) ? 0x20 : cc
          c = String.fromCharCode(cc)
        } else {
          c = $0
        }
      }
      return c
    })
  }

  Vue.prototype.$formatEmoji = function (content) {
    return content.replace(/:([a-z_]+):/g, function (str, $1) {
      return '<img src="http://newbbs.bingyan.net/assets/emojis/' + $1 + '.png" class="emoji" title="' + str + '">'
    })
  }
}
