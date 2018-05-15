// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import messages from './locale'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './utils/http'
import store from './store'
import './styles/light/index.less'
import iView from 'iview'
import BTable from './components/table/BTable.vue'

Vue.use(iView)
Vue.use(VueI18n)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('BTable', BTable)

window._ = require('lodash')
window.anime = require('animejs')

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App),
})
