import Vue from 'vue'

import VueLazyload from 'vue-lazyload'

const loadimage = require('@/assets/loading.gif')

// import * as loading from '@/assets/loading.jpg'

Vue.use(VueLazyload, {
    loading: loadimage,
})