import Vue from 'vue'
import VueRouter from 'vue-router'
import { getLoginToken } from '@/utils/token'
import store from '@/store'

// 解决编程式路由跳转多次携带相同参数到同一页面报错的问题
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { console.log(`别带着一样的参数跳转到:`, location); })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { console.log(`别带着一样的参数跳转到:`, location); })
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: { isShowFooter: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    // meta:{isShowFooter:false}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/search/:keyword?',
    name: 'Search',
    component: () => import('@/views/Search'),
    meta: { isShowFooter: true }
  },
  {
    path: '/detail/:skuId',
    name: 'Detail',
    component: () => import('@/views/Detail'),
    meta: { isShowFooter: true }
  },
  {

    path: '/addCartSuccess',
    name: 'AddCartSuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: { isShowFooter: true }
  },
  {
    path: '/shopCart',
    name: 'ShopCart',
    component: () => import('@/views/ShopCart'),
    meta: { isShowFooter: true }
  }
  ,
  {
    path: '/trade',
    name: 'Trade',
    component: () => import('@/views/Trade'),
    meta: { isShowFooter: true }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/views/Pay'),
    meta: { isShowFooter: true }
  },
  {
    path: '/paysuccess',
    name: 'PaySuccsee',
    component: () => import('@/views/PaySuccess'),
    meta: { isShowFooter: true }
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/views/Center'),
    children:[
      {
        path: '/center',
        redirect: '/center/myorder'
      },
      {
        path:'myorder',
        name: 'MyOrder',
        component:()=>import('@/views/Center/MyOrder')
      },
      {
        path:'grouporder',
        name: 'GroupOrder',
        component:()=>import('@/views/Center/GroupOrder')
      }
    ],
    meta: { isShowFooter: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    // vue2 不能用top
    return { y: 0 }
  },

})


router.beforeEach(async (to, from, next) => {
  if (getLoginToken()) {
    // 有token
    if (to.path == "/login") {
      next('/home')
    } else {
      // 有token,去的不是login,且有用户信息
      if(store.state.user.userInfo.nickName){
        next()
      }else{
        try {
          // 有token,去的不是login,没有有用户信息,获取用户信息
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
           // 有token,token失效了，拿不到用户信息
          store.dispatch('logoutAndClearLocalToken').then(res=>{
            next('/login')
          })
        }
      }
    }
  } else {
    // 没token,想去
    let needToken = ['/shopCart','/center']
    needToken.forEach((pathStr)=>{
      if(to.path.indexOf(pathStr) != -1){
        next(`/login?redirect=${to.path}`)
      }
    })
    next()
  }
})

export default router
