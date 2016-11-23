/* eslint-disable no-new */
require('../../scss/new.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import Header from './Header.vue'
import New from './New.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
let ConfirmPlugin = require('../../components/Confirm/Confirm.js')
// 注册全局函数
import Util from '../../js/Util.js'
import Filter from '../../js/Filter.js'
Util(Vue)
Filter(Vue)
// 主面板
Vue.use(VueResource)
Vue.use(WarnPlugin)
Vue.use(ConfirmPlugin)
Vue.http.options.emulateJSON = true
new Vue({
  components: {
    'header-component': Header,
    'new': New
  }
}).$mount('#app')
