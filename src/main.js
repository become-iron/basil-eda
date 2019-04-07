import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'tachyons/css/tachyons.css'

import { mxgraph } from './mxgraph'
import router from './router'
import store from './store'
import App from './App.vue'
import bus from './bus'

import './assets/index.scss'


Vue.bus = Vue.prototype.$bus = bus

Vue.mxgraph = Vue.prototype.$mxgraph = mxgraph

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
