<template lang="pug">
  modal(:visible="visible", @close="close")
    div.tile.is-ancestor(v-if="!!roles")
      div.tile.is-parent
        article.tile.is-child.box.is-clearfix
          h1.title 创建角色
          label.label 名称
          p.control
            input.input(type="text", v-model="name", :class="[!save_lock?'is-success':'is-danger']")
          label.label 继承自
          p.control
            span.select.is-fullwidth
              select(v-model="parent")
                option(:value="'_'", selected) 无
                template(v-for="role in roles")
                  option(:value="role.uin") {{role.role}}
          hr
          p.control.is-pulled-right
            button.button(@click="close", style="margin-right: 0.5rem;") 取消
            button.button.is-primary(@click="save", :disabled="save_lock", :class="{'is-loading':ajaxLock}") 提交
</template>

<script>
  import { Modal } from 'vue-bulma-modal'

  export default {
    data () {
      return {
        name: '',
        parent: '_',
        error: null,
        ajaxLock: false
      }
    },

    computed: {
      save_lock: function () {
        return !(this.name && this.name.length > 1 && this.name.length < 17)
      }
    },

    components: {
      Modal
    },

    props: {
      visible: Boolean,
      roles: null
    },

    methods: {
      close () {
        this.$emit('close')
      },
      save () {
        if (this.save_lock) {
          return
        }
        let vm = this
        vm.ajaxLock = true
        let body = this.parent === '_' ? {role: this.name} : {role: this.name, parent: this.parent}
        this.$http.post(`/p/000000000000000000000000/role`, body)
          .then(res => {
            if (res.data.result === 200) {
              vm.$emit('success')
              vm.$emit('close')
            } else {
              vm.error = `不是很清楚的错误。[${res.data.result}]`
            }
          }, err => {
            vm.error = err
          })
          .then(() => {
            vm.ajaxLock = false
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .input[disabled]
    color black!important
</style>
