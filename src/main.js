import Vue from 'vue'
import VueSplit from 'vue-split-panel'

import mxgraph from './plugins/mxgraph'
import router from './plugins/router'
import installElementUI from './plugins/element-ui'
import store from './store'
import App from './App.vue'
import bus from './plugins/bus'

import './assets/index.scss'


Vue.bus = Vue.prototype.$bus = bus
Vue.mxgraph = Vue.prototype.$mxgraph = mxgraph

installElementUI()
Vue.use(VueSplit)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
