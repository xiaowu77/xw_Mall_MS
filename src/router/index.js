import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Upload from '../components/Form/Upload'
import Editor from '../components/Form/Editor'
import Users from '../components/User/Users'
import UserForm from '../components/User/UserForm'
import Rights from '../components/Power/Rights'
import Roles from '../components/Power/Roles'
import Cate from '../components/Goods/Cate'
import CateForm from '../components/Goods/CateForm'
import Params from '../components/Goods/Params'
import ParamsForm from '../components/Goods/ParamsForm'
import ItemList from '../components/Goods/ItemList'
import ItemListForm from '../components/Goods/ItemListForm'
import Brand from '../components/Goods/Brand'
import BrandForm from '../components/Goods/BrandForm'
import Report from '../components/Report/Report'
import Order from '../components/Order/Order'

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {
    path: '/home',
    component: Home,
    redirect: '/report',
    children: [
      {path: '/upload',component: Upload},
      {path: '/editor',component: Editor},
      {path: '/users',component: Users},
      {path: '/userForm',component: UserForm},
      {path: '/rights',component: Rights},
      {path: '/roles',component: Roles},
      {path: '/cate',component: Cate},
      {path: '/cateForm',component: CateForm},
      {path: '/params',component: Params},
      {path: '/paramsForm',component: ParamsForm},
      {path: '/itemList',component: ItemList},
      {path: '/itemListForm',component: ItemListForm},
      {path: '/brand',component: Brand},
      {path: '/brandForm',component: BrandForm},
      {path: '/report',component: Report},
      {path: '/order',component: Order}
      ]
  }
]

const router = new VueRouter({
  routes
})
//路由导航守卫
// router.beforeEach((to, from, next) =>{
//   //to 将要访问的路径 from代表从哪个路径跳转 next是一个函数，表示放行
//   if(to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token');
//   if(!tokenStr) return next('/login')
//   next()
// })
export default router
