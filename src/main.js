// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUi from 'mint-ui'
import axios from 'axios'
import 'lib-flexible'
import 'mint-ui/lib/style.css'
import '../static/css/icon/iconfont.css';
import '../static/css/reset.css'
import '../static/css/color.scss'
import 'vue2-animate/dist/vue2-animate.min.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(MintUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
