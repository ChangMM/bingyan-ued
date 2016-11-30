/* eslint-disable no-new */
require('../../scss/mobile.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
let WarnPlugin = require('../../components/Warn/Warn.js')
// 注册全局函数
import Util from '../../js/Util.js'
import Filter from '../../js/Filter.js'
Util(Vue)
Filter(Vue)
// 主面板
import Header from './Header.vue'
import Footer from './Footer.vue'
import Category from './Category.vue'
import NotFound from './404.vue'
import Article from './Article.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(WarnPlugin)
Vue.http.options.emulateJSON = true
let routes = [
  { path: '/', redirect: '/category/all' },
  { path: '/category', redirect: '/category/all' },
  { path: '/404', component: NotFound },
  { path: '/category/:type', component: Category },
  { path: '/article/:id', component: Article },
  { path: '/:type', redirect: '/404' }
]
let router = new VueRouter({
  routes: routes
})
new Vue({
  router: router,
  components: {
    'header-component': Header,
    'footer-component': Footer
  }
}).$mount('#app')
