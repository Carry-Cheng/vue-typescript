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
        },
        {
          path: '/manager/music/upload',
          component: () => import('@/views/manager/music/Upload.vue'),
          mate: {
            isMenu: false,
            title: '上传音乐'
          }
        }
      ]
    },
    {
      path: '/manager/album',
      component: FrameNull,
      mate: {
        isMenu: true,
        title: '专辑管理'
      },
      children: [
        {
          path: '/manager/album',
          component: () => import('@/views/manager/album/Index.vue'),
          mate: {
            isMenu: false,
            title: '专辑列表'
          }
        },
        {
          path: '/manager/album/new',
          component: () => import('@/views/manager/album/Create.vue'),
          mate: {
            isMenu: false,
            title: '新增专辑'
          }
        }
      ]
    },
    {
      path: '/manager/singer',
      component: FrameNull,
      mate: {
        isMenu: true,
        title: '歌手管理'
      },
      children: [
        {
          path: '/manager/singer',
          component: () => import('@/views/manager/singer/Index.vue'),
          mate: {
            isMenu: false,
            title: '歌手列表'
          }
        },
        {
          path: '/manager/singer/new',
          component: () => import('@/views/manager/singer/Create.vue'),
          mate: {
            isMenu: false,
            title: '新增歌手'
          }
        }
      ]
    }
  ]
}
