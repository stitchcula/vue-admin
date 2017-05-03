import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
import charts from './charts'
import uifeatures from './uifeatures'
import components from './components'
import tables from './tables'
import managers from './managers'
import audimon from './audimon'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: '概览',
      path: '/dashboard',
      meta: {
        icon: 'fa-tachometer',
        link: 'dashboard/index.vue'
      },
      component: lazyLoading('dashboard', true)
    },
    {
      name: '个人信息',
      path: '/self',
      meta: {
        icon: 'fa-user-o',
        link: 'self/index.vue'
      },
      component: lazyLoading('self', true)
    },
    charts,
    uifeatures,
    components,
    tables,
    managers,
    audimon
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
