import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import HomeView from '@/views/HomeView.vue'
import SignUpView from '@/views/LoginView.vue'
import { useStore } from '@/stores/user'
import { ref, watchEffect } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: SignUpView
    }
  ]
})
nProgress.configure({
  showSpinner: true
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  nProgress.start()

  const store = useStore()
  const isLoggedIn = ref(store.isLoggedIn)

  const stop = watchEffect(() => (isLoggedIn.value = store.isLoggedIn))

  // 未登录转到/login
  if (!store.isLoggedIn && to.path !== '/login') {
    next('/login')
  } else if (store.isLoggedIn && to.path === '/login') {
    next('/')
  } else {
    next()
  }
  return stop
})

router.afterEach(() => {
  nProgress.done(true)
})
export default router
