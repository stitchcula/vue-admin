<template lang="pug">
  modal(:visible="visible", @close="close")
    div.tile.is-ancestor(v-if="!!rule")
      div.tile.is-parent
        article.tile.is-child.box.is-clearfix
          vb-switch.is-pulled-right(type="success", size="large", :checked="access", v-model="access")
          h1.title 编辑规则
          label.label ID
          p.control
            input.input(type="text", :value="rule.uin", disabled)
          label.label 目标
          p.control
            input.input(type="text", v-model="target")
          label.label 方法
          p.control
            span.select.is-fullwidth
              select(v-model="method")
                option(:value="'ALL'") ALL
                option(:value="'GET'") GET
                option(:value="'POST'") POST
                option(:value="'PUT'") PUT
                option(:value="'DELETE'") DELETE
          label.label 权重
          p.control
            input.input(type="number", v-model.number="weight")
          hr
          p.control.is-pulled-right
            button.button(@click="close", style="margin-right: 0.5rem;") 取消
            button.button.is-primary(@click="save", :disabled="save_lock", :class="{'is-loading':ajaxLock}") 提交

</template>

<script>
  import { Modal } from 'vue-bulma-modal'
  import VbSwitch from 'vue-bulma-switch'

  export default {
    data () {
      return {
        target: null,
        method: 'ALL',
        weight: null,
        access: true,
        error: null,
        save_lock: null,
        ajaxLock: false
      }
    },

    watch: {
      rule: function (val) {
        this.target = val.target
        this.method = val.method
        this.weight = val.weight
        this.access = (val.access === 'true')
      }
    },

    components: {
      Modal,
      VbSwitch
    },

    props: {
      visible: Boolean,
      rules: null,
      rule: null
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
        this.$http.put(`/p/000000000000000000000000/role/${this.rule.owner}/rule/${this.rule.uin}`,
          {target: this.target, method: this.method, weight: this.weight, access: this.access ? 'true' : 'false'})
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
