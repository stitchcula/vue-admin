import lazyLoading from './lazyLoading'

export default {
  name: 'Tables',
  meta: {
    label: 'Tables',
    icon: 'fa-table',
    expanded: false
  },

  children: [
    {
      name: 'BasicTables',
      path: '/tables/basic',
      meta: {
        label: 'Basic Tables',
        link: 'tables/Basic.vue'
      },
      component: lazyLoading('tables/Basic')
    }
  ]
}
