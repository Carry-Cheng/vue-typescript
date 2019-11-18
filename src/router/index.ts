import Vue from 'vue'
import VueRouter from 'vue-router'
import FrameIndex from '@/views/frame/Index.vue'
import FrameNull from '@/views/frame/Null.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/find',
    name: 'AppIndex',
    component: FrameIndex,
    children: [
      {
        path: '/find',
        redirect: '/find/recommend',
        name: 'AppFind',
        component: FrameNull,
        children: [
          {
            path: '/find/recommend',
            component: () => import('@/views/find/recommend/Index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    name: 'FrameErrorIndex',
    component: FrameIndex,
    children: [
      {
        path: '/404',
        name: 'App404',
        component: () => import('../views/404/Index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
