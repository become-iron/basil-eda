import Vue from 'vue'
import Vuex from 'vuex'

import pathify from './pathify'
import EditorStoreModule  from './editor.module'
import GraphStoreModule  from './graph.module'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [pathify.plugin],

  modules: {
    editor: EditorStoreModule,
    graph: GraphStoreModule
  }
})
