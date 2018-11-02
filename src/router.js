import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
import About from './views/About.vue'
import Detail from './views/Detail.vue'
import CourseInfo from './views/CourseInfo.vue'
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
      component: Auth
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
    },
    {
      path: '/info/:id',
      name: 'courseInfo',
      component: CourseInfo
    },
    {
      path: '/*', redirect: '/'
    }
  ]
})
// to.matched.some(record => record.meta.requiresAuth
router.beforeEach((to, from, next) => {
  if (!store.getters.authenticate) {
    store.dispatch('checkToken').then(() => {
      if (to.path == '/auth') return next('/')
      return next()
    }).catch(() => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        return next('/auth')
      }
      return next()
    })
  } else {
    if (to.path == '/auth') return next('/')
    return next()
  }
})

export default router