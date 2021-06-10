import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './components/error-pages/NotFound.vue'
import Home from './components/Home.vue'
import MapNavigation from './components/firebase-components/map/MapNavigation.vue'
import SurfaceList from './components/firebase-components/map/SurfaceList.vue'
import SurfaceCreate from './components/firebase-components/map/SurfaceCreate.vue'
import SurfaceUpdate from './components/firebase-components/map/SurfaceUpdate.vue'

import SignUp from './components/authentication/SignUp.vue'
import Login from './components/authentication/Login.vue'

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
    path: '/',
    name: 'Home',
    component: Home,
    },
    {
     path: '*',
     name: 'NotFound',
     component: NotFound
    },
     {
      path: '/list',
      name: 'SurfaceList',
      component: SurfaceList,
      meta: { requiresAuth: true }
     },
     {
      path: '/create',
      name: 'SurfaceCreate',
      component: SurfaceCreate,
      meta: { requiresAuth: true }
     },
     {
      path: '/edit/:id',
      name: 'edit',
      component: SurfaceUpdate,
      meta: { requiresAuth: true }
     },
     {
      path: '/map',
      name: 'MapNavigation',
      component: MapNavigation,
     },
     {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
     },
     {
      path: '/Login',
      name: 'Login',
      component: Login
     },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if(isAuthenticated && to.path === '/') {
    next()
  }
  if (requiresAuth && !isAuthenticated) {
    next('/Login')
  } else {
    next()
  }
}) 

export default router
