import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/font/iconfont.css'
// 全局样式
import './assets/css/global.css'

import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL="http://api.yigou.com/api"
// axios可以全局引用
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
