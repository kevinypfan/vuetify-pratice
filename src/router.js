import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
import About from './views/About.vue'
import Detail from './views/Detail.vue'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: { alreadyAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: true }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.state.user.user & to.path !== '/auth') next()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkToken').then(() => {
      next()
    }).catch(() => {
      next('/auth')
    })
  } else if (to.matched.some(record => record.meta.alreadyAuth)) {
    store.dispatch('checkToken').then(() => {
      next('/')
    }).catch(() => {
      next()
    })
  } else {
    next()
  }
})

export default router