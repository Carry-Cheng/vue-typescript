import Vue from 'vue'
import VueRouter from 'vue-router'
import FrameIndex from '@/views/frame/Index.vue'
import ManagerFrameIndex from '@/views/manager/manager-frame/Index.vue'
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
          },
          {
            path: '/find/rank',
            component: () => import('@/views/find/rank-list/Index.vue')
          }
        ]
      },
      {
        path: '/my',
        redirect: '/my/index',
        name: 'AppMy',
        component: FrameNull,
        children: [
          {
            path: '/my/index',
            component: () => import('@/views/my/Index.vue')
          }
        ]
      },
      {
        path: '/friends',
        redirect: '/friends/index',
        name: 'AppFriends',
        component: FrameNull,
        children: [
          {
            path: '/friends/index',
            component: () => import('@/views/friends/Index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/manager',
    redirect: '/manager/welcome',
    name: 'ManagerFrameIndex',
    component: ManagerFrameIndex,
    children: [
      {
        path: '/manager/welcome',
        component: () => import('@/views/manager/welcome/Index.vue')
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
