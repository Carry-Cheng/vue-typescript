import ManagerFrameIndex from '@/views/manager/manager-frame/Index.vue'
import FrameNull from '@/views/manager/manager-frame/Null.vue'
export default   {
  path: '/manager',
  redirect: '/manager/welcome',
  name: 'ManagerFrameIndex',
  component: ManagerFrameIndex,
  children: [
    {
      path: '/manager/welcome',
      component: () => import('@/views/manager/welcome/Index.vue'),
      mate: {
        isMenu: true,
        title: '首页'
      }
    },
    {
      path: '/manager/music',
      component: FrameNull,
      mate: {
        isMenu: true,
        title: '音乐管理'
      },
      children: [
        {
          path: '/manager/music',
          component: () => import('@/views/manager/music/Index.vue'),
          mate: {
            isMenu: false,
            title: '音乐列表'
          }
        },
        {
          path: '/manager/music/new',
          component: () => import('@/views/manager/music/Create.vue'),
          mate: {
            isMenu: false,
            title: '新增音乐'
          }
        }
      ]
    }
  ]
}
