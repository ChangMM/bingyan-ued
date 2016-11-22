function install (Vue) {
  let AlertConstructor = Vue.extend(require('./Confirm.vue'))
  let alertInstance = null
  let body = document.getElementsByTagName('body')[0]

  Vue.prototype.$confirm = function (message) {
    if (alertInstance) return
    alertInstance = new AlertConstructor({
      el: document.createElement('div'),
      data () {
        return {
          instance: alertInstance,
          resolve: '',
          reject: ''
        }
      },
      mounted () {
        this.$nextTick(function () {
          body.appendChild(this.$el)
        })
      },
      methods: {
        f_close: function () {
          this.$el.remove()
          alertInstance = null
        },
        f_cancel: function () {
          alertInstance.reject(0)
          alertInstance.f_close()
        },
        f_confirm: function () {
          alertInstance.resolve(1)
          alertInstance.f_close()
        }
      }
    })
    return new Promise(function (resolve, reject) {
      alertInstance.resolve = resolve
      alertInstance.reject = reject
    })
  }
}

let MyPlugin = {
  install: install
}

module.exports = MyPlugin
