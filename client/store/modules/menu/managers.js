import lazyLoading from './lazyLoading'

export default {
  name: '综合管理',
  meta: {
    label: '综合管理',
    icon: 'fa-sitemap',
    expanded: false
  },

  children: [
    {
      name: '用户',
      path: '/mgr/user',
      meta: {
        label: '用户',
        icon: 'fa-users',
        link: 'managers/User.vue'
      },
      component: lazyLoading('managers/User')
    },
    {
      name: '角色',
      path: '/mgr/role',
      meta: {
        label: '角色',
        icon: 'fa-ticket',
        link: 'managers/Role.vue'
      },
      component: lazyLoading('managers/Role')
    },
    {
      name: '应用',
      path: '/mgr/app',
      meta: {
        label: '应用',
        icon: 'fa-cubes',
        link: 'managers/App.vue'
      },
      component: lazyLoading('managers/App')
    }
  ]
}
