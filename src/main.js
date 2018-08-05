// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUi from 'mint-ui'
import 'lib-flexible'
import 'mint-ui/lib/style.css'
import '../static/css/icon/iconfont.css';
import '../static/css/reset.css'
import '../static/css/color.scss'

Vue.config.productionTip = false
Vue.use(MintUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
