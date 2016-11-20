function install (Vue) {
  let AlertConstructor = Vue.extend(require('./Warn.vue'))
  let alertInstance = null
  let body = document.getElementsByTagName('body')[0]

  Vue.prototype.$warn = function (message, callback) {
    if (alertInstance) return
    alertInstance = new AlertConstructor({
      el: document.createElement('div'),
      data () {
        return {
          msg: message
        }
      },
      methods: {
        afterEnter: function () {
          setTimeout(() => {
            this.$el.remove()
            alertInstance = null
          }, 1500)
        }
      },
      mounted () {
        this.$nextTick(function () {
          body.appendChild(this.$el)
        })
      }
    })
    if (callback) {
      setTimeout(function () {
        callback && callback()
      }, 1000)
    }
  }
}

let MyPlugin = {
  install: install
}

module.exports = MyPlugin
