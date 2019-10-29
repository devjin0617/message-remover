import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'landing-page',
    component: require('@/components/LandingPage').default
  },
  {
    path: '/token',
    name: 'token-page',
    component: require('@/pages/TokenPage').default
  },
  {
    path: '/message',
    name: 'message-page',
    component: require('@/pages/MessagePage').default
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
