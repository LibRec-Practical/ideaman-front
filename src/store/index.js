import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      username: '',
      name: '',
      avatar: '',
      jsonAuthToken: ''
    }
  },
  mutations: {
    authorize (state, {
      name,
      username,
      avatar,
      token
    }) {
      state.auth.name = name
      state.auth.avatar = avatar
      state.auth.username = username
      state.auth.jsonAuthToken = token
    },
    changeAuthToken (state, {
      authToken
    }) {
      state.auth.jsonAuthToken = authToken
    },
    removeAuthorization (state) {
      state.auth.name = ''
      state.auth.avatar = ''
      state.auth.username = ''
      state.auth.jsonAuthToken = ''
    }
  },
  getters: {
    isAuthorized (state) {
      // return !!state.auth.jsonAuthToken
      return !!window.localStorage.getItem('ideaman_token')
      // 不知道为什么，这个值在页面刷新后才变化，导致登录后如果没刷新，路由守卫认为你还是没有资格
    }
  },
  actions: {
  }
})
