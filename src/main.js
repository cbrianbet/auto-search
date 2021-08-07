import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import { DropDownListPlugin, AutoCompletePlugin } from '@syncfusion/ej2-vue-dropdowns'
import axios from 'axios'

Vue.use(DropDownListPlugin, AutoCompletePlugin)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

axios.defaults.withCredentials = false
// axios.defaults.baseURL = 'https://api..co.ke/'
axios.defaults.baseURL = 'http://127.0.0.1:5000/'
Vue.prototype.$http = axios

const TokenKey = 'Admin-Token'
const token = Cookies.get(TokenKey)
// console.log(token)
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
