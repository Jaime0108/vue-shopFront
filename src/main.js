import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 导航栏组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

// 轮播图组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)

// 分页器组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

import { MessageBox, Message } from 'element-ui';
// Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

// 挂载封装过的axios请求
import api from './api'
Vue.prototype.$api = api

// 引入mock数据
// import Mock from '@/api/mockServe/mockServe'
import '@/mock/mockServe'

// 引入swiper样式
import "swiper/css/swiper.css"

// 图片懒加载 
import '@/plugins/vuelazyload'

new Vue({
  router,
  store,
  // 安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
