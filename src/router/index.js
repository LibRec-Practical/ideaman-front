import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页'
    }
  },
  // auth 包含以下 login, register, forgotpassword 三个模块
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "auth" */ '../views/ForgotPassword.vue'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: () => import(/* webpackChunkName: "myprofile" */ '../views/MyProfile.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
    meta: {
      title: '个人设置'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/author/:userId',
    name: 'Author',
    component: () => import(/* webpackChunkName: "author" */ '../views/Author.vue'),
    meta: {
      title: '作者'
    }
  },
  {
    path: '/arxiv/:arxivId',
    name: 'PaperArxiv',
    component: () => import(/* webpackChunkName: "paper" */ '../views/Paper.vue'),
    meta: {
      title: '论文'
    }
  },
  {
    path: '/paper/:paperId',
    name: 'PaperUpload',
    component: () => import(/* webpackChunkName: "paper" */ '../views/Paper.vue'),
    meta: {
      title: '论文'
    }
  },
  {
    path: '/mylibrary',
    name: 'MyLibrary',
    component: () => import(/* webpackChunkName: "mylibrary" */ '../views/MyLibrary.vue'),
    meta: {
      title: '论文库'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
