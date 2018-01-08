// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入 weui 样式
import 'weui/dist/style/weui.min.css'

// 引入二维码插件
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
import 'vue-qriously/dist/vue-qriously.js'

// 按需引入iview组件
import { Scroll, Spin, Icon } from 'iview'
Vue.component('Scroll', Scroll)
Vue.component('Spin', Spin)
Vue.component('Icon', Icon)
import 'iview/dist/styles/iview.css'

// 引入mockjs
import mock from './mock/mock'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
