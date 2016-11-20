function install (Vue) {
  let AlertConstructor = Vue.extend(require('./Confirm.vue'))
  let alertInstance = null

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
      methods: {
        f_close: function () {
          alertInstance.$remove()
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
    alertInstance.$appendTo(document.body)
    return new Promise(function (resolve, reject) {
      alertInstance.resolve = resolve
      alertInstance.reject = reject
    })
  }

  Vue.transition('confirmIn')
}

let MyPlugin = {
  install: install
}

module.exports = MyPlugin
