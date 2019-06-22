import Vue from 'vue'
import Router from 'vue-router'

import EditorPage from '../views/EditorPage'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      redirect: '/editor'
    },
    {
      path: '/editor',
      component: EditorPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
