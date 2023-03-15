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
    redirect: '/home'
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
    meta: { isShowFooter: true },
    // beforeEnter (to, from, next) {
    //   // 得到当前路由信息对象
    //   // const route = router.currentRoute  // route就是from

    //   // 得到要跳转到目路由的query参数
    //   const skuNum = to.query.skuNum
    //   // 读取保存的数据
    //   const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
    //   // 只有都存在, 才放行
    //   if (skuNum && skuInfo) {
    //     next()
    //   } else { // 在组件对象创建前强制跳转到首页
    //     next('/')
    //   }
    // }
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
    meta: { isShowFooter: true },
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter (to, from, next) {
      if (from.path==='/shopCart') {
        next()
      } else {
        next('/shopCart')
      }
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/views/Pay'),
    meta: { isShowFooter: true },
    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter (to, from, next) {
      if (from.path==='/trade') {
        next()
      } else {
        next('/trade')
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'PaySuccsee',
    component: () => import('@/views/PaySuccess'),
    meta: { isShowFooter: true },
    /* 只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter (to, from, next) {
      if (from.path==='/pay') {
        next()
      } else {
        next('/pay')
      }
    }
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/views/Center'),
    children: [
      {
        path: '/center',
        redirect: '/center/myorder'
      },
      {
        path: 'myorder',
        name: 'MyOrder',
        component: () => import('@/views/Center/MyOrder')
      },
      {
        path: 'grouporder',
        name: 'GroupOrder',
        component: () => import('@/views/Center/GroupOrder')
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
    if (to.path == "/login" || to.path == '/register') {
      next('/')
    } else {
      // 有token,去的不是login,且有用户信息
      if (store.state.user.userInfo.nickName) {
        next()
      } else {
        try {
          // 有token,去的不是login,没有有用户信息,获取用户信息
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 有token,token失效了，拿不到用户信息
          store.dispatch('logoutAndClearLocalToken').then(res => {
            next('/login')
          })
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' + toPath);
    } else {
      //去的不是上面这些路由（home|search|shopCart）---放行
      next();
    }
  }
})

export default router
