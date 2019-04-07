import Vue from 'vue'
import Vuex from 'vuex'

import GraphStoreModule  from './graph.module'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    graph: GraphStoreModule
  },

  state: {

  },

  mutations: {

  },

  actions: {

  }
})
