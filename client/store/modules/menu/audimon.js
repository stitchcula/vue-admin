import lazyLoading from './lazyLoading'

export default {
  name: 'Audimon',
  meta: {
    label: 'Audimon',
    icon: 'fa-database',
    expanded: false
  },

  children: [
    {
      name: '录入',
      path: '/audimon/upload',
      meta: {
        label: '录入',
        icon: 'fa-cloud-upload',
        link: 'audimon/Upload.vue'
      },
      component: lazyLoading('audimon/Upload')
    },
    {
      name: '管理',
      path: '/audimon/mgr',
      meta: {
        label: '管理',
        icon: 'fa-list-ul',
        link: 'audimon/Mgr.vue'
      },
      component: lazyLoading('audimon/Mgr')
    },
    {
      name: '任务',
      path: '/audimon/task',
      meta: {
        label: '任务',
        icon: 'fa-tasks',
        link: 'audimon/Task.vue'
      },
      component: lazyLoading('audimon/Task')
    }
  ]
}
