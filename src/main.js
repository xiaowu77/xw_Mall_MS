import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入对应的富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入字体图标
import './assets/font/iconfont.css'
// 全局样式
import './assets/css/global.css'
import axios from 'axios'

//配置请求根路径
axios.defaults.baseURL="http://api.yigou.com/api"
//请求头中加入Authorization属性（过滤）
// axios.interceptors.request.use(config=>{
//   config.headers.Authorization=window.sessionStorage.getItem('token')
//   return config
// })
// axios可以全局引用
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
//将富文本注册为全局可用
Vue.use(VueQuillEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
