import { createRouter, createWebHistory } from 'vue-router'
import CoachList from './pages/coaches/CoachList.vue'
// import CoachDetails from './pages/coaches/CoachDetails.vue'
// import ContactCoach from './pages/requests/ContactCoach.vue'
// import CoachRegistration from './pages/coaches/CoachRegistration.vue'
// import RequestsList from './pages/requests/RequestsList.vue'
import NotFound from './pages/NotFound.vue'
// import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/index.js'

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue')
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue')
const RequestsList = () => import('./pages/requests/RequestsList.vue')
const UserAuth = () => import('./pages/auth/UserAuth.vue')
const ContactCoach = () => import('./pages/requests/ContactCoach.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true }
    },
    {
      path: '/coaches',
      component: CoachList
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsList,
      meta: { requiresAuth: true }
    },

    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
