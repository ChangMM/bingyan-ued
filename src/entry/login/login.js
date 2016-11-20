/* eslint-disable no-new */
require('../../scss/login.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import Header from './Header.vue'
import Login from './Login.vue'
import Footer from './Footer.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
// 注册全局函数
import Util from '../../js/Util.js'
Util(Vue)
// 主面板
Vue.use(VueResource)
Vue.use(WarnPlugin)
Vue.http.options.emulateJSON = true
new Vue({
  components: {
    'header-component': Header,
    'footer-component': Footer,
    'login-component': Login
  }
}).$mount('#app')
