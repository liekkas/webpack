import jsSHA from 'jssha';
import router from '../router'
import axios from '../utils/http'
import qs from 'qs'
import API from '../api'
import Cookie from 'js-cookie'

const app = {
  state: {
    token: Cookie.get('app_token'),
    isAdmin: Cookie.get('app_isAdmin'),
    appMenus: Cookie.get('app_menus'),
    authMenus: Cookie.get('auth_menus'),
    user: Cookie.getJSON('app_user'),
    loginLoading: false,
    loginMsg: '',
    themeSwitch:true,
  },
  mutations: {
    SET_TOKEN: (state, payload) => state.token = payload,
    SET_USER: (state, payload) => state.user = payload,
    SET_APP_MENUS: (state, payload) => state.appMenus = payload,
    SET_AUTH_MENUS: (state, payload) => state.authMenus = payload,
    SET_LOGIN_LOADING: (state, payload) => state.loginLoading = payload,
    SET_LOGIN_MSG: (state, payload) => state.loginMsg = payload,
    REMOVE_MSG: (state, payload) => state.loginMsg = payload,
    SET_THEME: (state, payload) =>state.themeSwitch = payload,
    SET_IS_ADMIN: (state, payload) =>state.isAdmin = payload,
  },
  actions: {
    fetchToken({ commit, dispatch }, payload){
      const shaObj = new jsSHA('SHA-1', 'TEXT')
      shaObj.update(payload.password)
      const para = {
        ...payload,
        password: shaObj.getHash('HEX'),
        scope: 'ui',
        grant_type: 'password',
        client_id: 'browser'
      }

      commit('SET_LOGIN_LOADING', true)
      axios({
        method: 'post',
        url: API.login.token,
        data: qs.stringify(para),
        showSpin: false,
      }).then(response => {
          commit('SET_TOKEN', response.access_token)
          Cookie.set('app_token', response.access_token)
          dispatch('fetchAccount')
          commit('SET_LOGIN_MSG', '')
        }).catch(err => {
          commit('SET_LOGIN_LOADING', false)
          if(err.response) {
            if (err.response.status === 500) {
              commit('SET_LOGIN_MSG', '验证服务连接失败！')
            } else {
              commit('SET_LOGIN_MSG', '账号和密码不匹配！')
            }
          } else {
            commit('SET_LOGIN_MSG', '验证失败！')
          }
      })
    },

    fetchAccount({commit, state}) {
      commit('SET_LOGIN_LOADING', true)
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: API.login.account,
          showSpin: false,
        }).then(response => {
          commit('SET_LOGIN_LOADING', false)
          commit('SET_USER', response)
          const menus = _.map(response.urlauthorityList, 'authorityName')
          commit('SET_AUTH_MENUS', menus)
          Cookie.set('auth_menus', menus)
          const isAdmin = response.userName === 'admin' ? 1 : 0
          commit('SET_IS_ADMIN', isAdmin)
          Cookie.set('app_isAdmin', isAdmin)
          if(router.currentRoute.path === '/login') {
            router.push('/')
          }
          resolve(response)
        }).catch(err => {
          commit('SET_LOGIN_LOADING', false)
          Cookie.remove('app_token')
          router.push('/login')
          reject(err)
        })
      })
    },

    logout({commit, state}) {
      Cookie.remove('app_token')
      Cookie.remove('app_isAdmin')
      Cookie.remove('auth_menus')
      Cookie.remove('app_user')
      router.push('/login')
    },
    removeMsg({ commit }, payload){
      commit('REMOVE_MSG', payload)
    },
  }
};

export default app;
