import Vue from 'vue'
import App from './App'
import router from './router'

// 引入 weui 样式
import 'weui/dist/style/weui.min.css'

// 引入二维码插件
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
import 'vue-qriously/dist/vue-qriously.js'

// 引入 mockjs 只在开发环境中使用，生产环境中可以注释掉
// import mock from './mock/mock'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
