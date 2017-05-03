<template lang="pug">
  modal(:visible="visible", @close="close")
    div.tile.is-ancestor(v-if="!!user")
      div.tile.is-parent
        article.tile.is-child.box
          h1.title 基本信息
          label.label ID
          p.control
            input.input(type="text", :value="user.uin", disabled)
          label.label 用户名
          p.control
            input.input(type="text", :value="user.nickname", disabled)
          label.label 邮箱
          p.control
            input.input(type="text", :value="user.email", disabled)
          label.label 注册时间
          p.control
            input.input(type="text", :value="new Date(user.timestamp)", disabled)
          label.label 最后登录时间
          p.control
            input.input(type="text", :value="new Date(user.LastLoginTime)", disabled)
          label.label 最后登录IP
          p.control
            input.input(type="text", :value="user.LastLoginIp", disabled)
      div.tile.is-parent.is-5.is-vertical
        article.tile.is-child.box
          h1.title 重置密码
        article.tile.is-child.box
          h1.title 管理

</template>

<script>
  import { Modal } from 'vue-bulma-modal'

  export default {
    components: {
      Modal
    },

    props: {
      visible: Boolean,
      user: null
    },

    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .input[disabled]
    color black!important
</style>
