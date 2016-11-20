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
  {
    path: '/category/404',
    component: NotFound
  },
  {
    path: '/category/:type',
    component: Category,
    beforeEnter: function (to, from, next) {
      // 为什么这个会有问题
      // console.log(to.params.type, from.params.type)
      let routes = ['all', 'pm', 'vd', 'id', 'fe', 'rd', '404']
      if (routes.indexOf(to.params.type) !== -1) {
        next(true)
      } else {
        next('/category/404')
      }
    }
  },
  { path: '/article/:id', component: Article },
  { path: '/search', redirect: '/search/ ' },
  { path: '/search/:keyword', name: 'search', component: Search }
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
