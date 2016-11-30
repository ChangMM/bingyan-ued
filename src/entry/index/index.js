/* eslint-disable no-new */
require('../../scss/index.scss')
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Nav from '../../components/Nav.vue'
let WarnPlugin = require('../../components/Warn/Warn.js')
// 注册全局函数
import Util from '../../js/Util.js'
import Filter from '../../js/Filter.js'
Util(Vue)
Filter(Vue)
// 主面板
import Category from './Category.vue'
import Search from './Search.vue'
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
  { path: '/search', redirect: '/search/ ' },
  { path: '/search/:keyword', name: 'search', component: Search },
  { path: '/:type', redirect: '/404' }
]
let router = new VueRouter({
  routes: routes
})
new Vue({
  router: router,
  components: {
    'header-component': Header,
    'footer-component': Footer,
    'nav-component': Nav
  }
}).$mount('#app')
