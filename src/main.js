import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  axios
} from './utils/request'
import VueAxios from 'vue-axios'
import iView from 'iview'
import './styles/iview-variables.css'
import {
  setDocumentTitle,
  domTitle
} from './utils/domUtil'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// 使用 iview UI组件库
Vue.use(iView)

const whiteList = ['Home', 'About', 'Login', 'Register', 'ForgotPassword'] // no redirect whitelist

// 全局路由守卫
router.beforeEach((to, from, next) => {
  to.meta.title && setDocumentTitle(`${to.meta.title} - ${domTitle}`)
  if (store.getters.isAuthorized) {
    // 有 token
    if (to.path === '/login') {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  } else {
    // 没有 token
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
