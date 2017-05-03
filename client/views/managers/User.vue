<template lang="pug">
  div.tile.is-parent.sc-mgr-user
    create-user(:visible="CreateUserModal", @close="closeCreateUserModal")
    edit-user(:visible="EditUserModal", @close="closeEditUserModal", :user="selected_user")
    article.tile.box.is-child
      div.block.sc-operate
        a.button.is-primary.modal-button(@click="openCreateUserModal")
          span.icon.is-small
            i.fa.fa-user-plus
          span 添加
        p.control.has-addons
          span.select
            select(v-model="search_by")
              option(:value="'nickname'", selected) 按用户名
              option(:value="'email'") 按邮箱
              option(:value="'role'") 按角色
          input.input(type="text", placeholder="关键词", v-model="search_value")
          a.button.is-primary(@click="search") 查询
      div.sc-preview
        table.table(v-if="users&&users.length>0")
          thead
            tr
              td 用户名
              td 邮箱
              td 角色
              td
          tbody
            template(v-for="(user, key) in users")
              tr
                td {{user.nickname}}
                td {{user.email}}
                td {{user.role.role}}
                td.is-icon
                  a(@click="openEditUserModal(key)")
                    i.fa.fa-external-link

</template>

<script>
  import CreateUser from './modals/CreateUser.vue'
  import EditUser from './modals/EditUser.vue'

  export default {
    data () {
      return {
        search_by: 'nickname',
        search_value: '',
        CreateUserModal: false,
        EditUserModal: false,
        users: null,
        selected_user: null
      }
    },

    methods: {
      openCreateUserModal () {
        this.CreateUserModal = true
      },

      closeCreateUserModal () {
        this.CreateUserModal = false
      },

      search () {
        let vm = this
        this.$http.get(`/p/000000000000000000000000/user?by=${this.search_by}&kw=${this.search_value}`)
          .then(res => {
            if (res.data.result === 200) {
              vm.users = res.data.users
            } else {
              vm.error = `不是很清楚的错误。[${res.data.result}]`
            }
          }, err => {
            vm.error = err
          })
      },

      openEditUserModal (key) {
        this.selected_user = this.users[key]
        this.EditUserModal = true
      },

      closeEditUserModal () {
        this.EditUserModal = false
      }
    },

    components: {
      CreateUser,
      EditUser
    }
  }
</script>

<style lang="scss" scoped>
  .sc-mgr-user>.box{
    background:white url("~assets/logo.svg") no-repeat center;
    background-size:50% 50%;
  }
</style>
<style lang="stylus">
  .sc-mgr-user
    .sc-operate
      display flex
      width 100%
      justify-content space-between
      >*:first-child
        margin-right 0.75rem
    .is-title
      text-transform capitalize

    .sc-preview
      background rgba(255,255,255,0.8)
      min-height 30rem
      .table
        margin-bottom 0
      td.is-icon .fa
        margin-top 0.35rem
</style>
