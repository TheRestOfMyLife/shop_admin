import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

// 给router对象注册导航守卫
// to:要去哪儿 form:从哪儿来 next:是否方向
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
