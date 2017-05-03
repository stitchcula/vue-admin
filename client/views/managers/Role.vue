<template lang="pug">
  div.sc-mgr-role
    create-role(:visible="modals.CreateRole", @close="closeModal('CreateRole')", :roles="roles", @success="fetchRole()")
    create-rule(:visible="modals.CreateRule", @close="closeModal('CreateRule')", :rules="rules", @success="fetchRole()", :role="selected_role")
    edit-role(:visible="modals.EditRole", @close="closeModal('EditRole')", :role="selected_role", :roles="roles", @success="fetchRole()")
    edit-rule(:visible="modals.EditRule", @close="closeModal('EditRule')", :rule="selected_rule", :roles="rules", @success="fetchRole()")
    div.tile.is-ancestor
      div.tile.is-parent
        article.tile.is-child.box
          h1.title 角色与访问规则
          div.columns
            div.column.is-12-mobile.is-4-tablet.is-4-desktop
              div.block.is-flex
                tabs(animation="slide", :only-fade="false")
                  tab-pane(label="角色")
                    action-block(@create="openModal('CreateRole')", @remove="", @edit="openModal('EditRole')", :visible="true").sc-mgr-role-ab
                      table.table
                        thead
                          tr
                            td
                            td.has-text-centered 名称
                        tbody
                          template(v-for="(role, index) in roles")
                            tr(@click="selected_role=role", :class="{selected:selected_role.uin===role.uin}")
                              td.is-primary {{index}}
                              td.has-text-centered {{role.role}}
            div.column.is-12-mobile.is-8-tablet.is-8-desktop
              div.block.is-flex
                tabs(animation="slide", :only-fade="false")
                  tab-pane(label="规则")
                    action-block(@create="openModal('CreateRule')", @remove="", @edit="openModal('EditRule')", :visible="true").sc-mgr-role-ab
                      table.table
                        thead
                          tr
                            td
                            td.has-text-centered  目标
                            td.has-text-centered(width="64")  方法
                            td.has-text-centered(width="64")  权重
                            td.is-icon
                        tbody
                          template(v-for="(rule, index) in rules")
                            tr(@click="selected_rule=rule", :class="{selected:selected_rule.uin===rule.uin}")
                              td.is-primary {{index}}
                              td {{rule.target}}
                              td.has-text-centered {{rule.method}}
                              td.has-text-centered {{rule.weight}}
                              td.is-icon
                                a
                                  i.fa(:class="rule.access!=='true'?['fa-ban','is-danger']:['fa-check-circle-o','is-success']")
                  tab-pane(label="菜单")
                    rs-action-block(@save="saveMenu", @reset="resetMenu", :visible="true").sc-mgr-role-ab
                      div.columns(style="height:100%;")
                        div.column.is-6(style="height:100%;overflow-y:auto")
                          table.table
                            thead
                              tr
                                td
                                td.has-text-centered  一级菜单
                                td.is-icon
                            tbody
                              template(v-for="(item, index) in menu")
                                tr(@click="selected_menu=item", :class="{selected:selected_menu.name===item.name}")
                                  td.is-primary {{index}}
                                  td {{item.name}}
                                  td.is-icon
                                    vb-switch(type="success", size="small", :checked="item.meta.enable", v-model="item.meta.enable")
                        div.column.is-6(style="height:100%;overflow-y:auto")
                          table.table(v-if="!!selected_menu && selected_menu.children && selected_menu.children.length")
                            thead
                              tr
                                td
                                td.has-text-centered  二级菜单
                                td.is-icon
                            tbody
                              template(v-for="(subItem, index) in selected_menu.children")
                                tr
                                  td.is-primary {{index}}
                                  td {{subItem.meta && subItem.meta.label || subItem.name}}
                                  td.is-icon
                                    vb-switch(type="success", size="small", v-model="selected_menu.children[index].meta.enable")
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Tabs, TabPane } from 'vue-bulma-tabs'
  import VbSwitch from 'vue-bulma-switch'
  import ActionBlock from '../../components/ActionBlock.vue'
  import RsActionBlock from './components/RSActionBlock.vue'
  import CreateRole from './modals/CreateRole.vue'
  import EditRole from './modals/EditRole.vue'
  import CreateRule from './modals/CreateRule.vue'
  import EditRule from './modals/EditRule.vue'

  export default {
    data () {
      return {
        roles: null,
        selected_role: null,
        rules: null,
        selected_rule: null,
        selected_menu: {},
        error: null,
        modals: {
          CreateRole: false,
          EditRole: false,
          CreateRule: false,
          EditRule: false
        }
      }
    },

    methods: {
      openModal (name) {
        this.modals[name] = true
      },

      closeModal (name) {
        this.modals[name] = false
      },

      fetchRole () {
        let vm = this
        this.$http.get(`/p/000000000000000000000000/role?kw=`)
          .then(res => {
            if (res.data.result === 200) {
              vm.roles = res.data.roles
              if (!vm.selected_role) {
                vm.selected_role = vm.roles[0] || {}
              }
              vm.fetchRule(vm.selected_role)
            } else {
              vm.error = `不是很清楚的错误。[${res.data.result}]`
            }
          }, err => {
            vm.error = err
          })
      },

      fetchRule (val) {
        let vm = this
        this.$http.get(`/p/000000000000000000000000/role/${val.uin}/rule`)
          .then(res => {
            if (res.data.result === 200) {
              vm.rules = res.data.rules
              vm.selected_rule = vm.rules[0] || {}
            } else {
              vm.error = `不是很清楚的错误。[${res.data.result}]`
            }
          }, err => {
            vm.error = err
          })
      },

      saveMenu () {
        let vm = this
        this.$http.put(`/p/000000000000000000000000/role/${this.selected_role.uin}/menu`)
          .then(res => {
            if (res.data.result === 200) {
              console.log(res.data)
            } else {
              vm.error = `不是很清楚的错误。[${res.data.result}]`
            }
          }, err => {
            vm.error = err
          })
      },

      resetMenu () {

      }
    },

    computed: mapGetters({
      menu: 'menuitems'
    }),

    watch: {
      selected_role: function (val) {
        this.fetchRule(val)
      }
    },

    mounted () {
      this.fetchRole()
    },

    components: {
      ActionBlock,
      Tabs,
      TabPane,
      CreateRole,
      EditRole,
      CreateRule,
      EditRule,
      VbSwitch,
      RsActionBlock
    }
  }
</script>

<style lang="stylus" scoped>
  .is-title
    text-transform capitalize
  .sc-mgr-role-ab
    width 100%
    height 30rem
    .table
      background rgb(245,245,245)
      margin 0
      tr
        cursor pointer
        transition: all 0.3s
      tr.selected
        background rgba(0, 210, 179, 0.26)
      td:first-child
        width 1.5rem
        text-align center
      td.is-primary
        color #00d1b2
      td.is-icon
        width 2.5rem
        text-align center
      td
        font-weight normal
        padding 0.25rem
      .fa
        margin-top 0.2rem
      .fa.is-danger
        color #ff3860!important
      .fa.is-success
        color #23d160!important
</style>
