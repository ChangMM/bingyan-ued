/* eslint-disable no-new */
require('../../scss/admin.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Header from './Header.vue'
import Nav from './Nav.vue'
import Released from './Released.vue'
import Checking from './Checking.vue'
import Rejected from './Rejected.vue'
import Comment from './Comment.vue'
import People from './People.vue'

let WarnPlugin = require('../../components/Warn/Warn.js')
let ConfirmPlugin = require('../../components/Confirm/Confirm.js')
// 注册全局函数
import Util from '../../js/Util.js'
import Filter from '../../js/Filter.js'
Util(Vue)
Filter(Vue)

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(WarnPlugin)
Vue.use(ConfirmPlugin)
Vue.http.options.emulateJSON = true
let routes = [
  {path: '/released', component: Released},
  {path: '/checking', component: Checking},
  {path: '/rejected', component: Rejected},
  {path: '/people', component: People},
  {path: '/comment', component: Comment}]
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
