/* eslint-disable no-new */
require('../../scss/admin.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Header from './Header.vue'
import Nav from './Nav.vue'
import Main from './Main.vue'
import Released from './released/Released.vue'
import Articles from './articles/Articles.vue'
import Account from './setting/Account.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
// 注册全局函数
import Util from '../../js/Util.js'
import Filter from '../../js/Filter.js'
Util(Vue)
Filter(Vue)

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(WarnPlugin)
Vue.http.options.emulateJSON = true
let routes = [
  {path: '/', redirect: '/main'},
  {path: '/main', component: Main},
  {path: '/released', component: Released},
  {path: '/articles', component: Articles},
  {path: '/setting', component: Account}
]
let router = new VueRouter({
  routes: routes
})
new Vue({
  router: router,
  components: {
    'header-component': Header,
    'nav-component': Nav
  }
}).$mount('#app')
