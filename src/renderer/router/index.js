import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/token',
    name: 'token-page',
    component: require('@/pages/TokenPage').default
  },
  {
    path: '/message/:id',
    name: 'message-page',
    component: require('@/pages/MessagePage').default
  },
  {
    path: '*',
    redirect: '/token'
  }
  ]
})
