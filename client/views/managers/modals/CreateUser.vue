<template lang="pug">
  modal(:visible="visible", @close="close")
    div.box.is-clearfix
      h1.title 创建用户
      notification(v-show="error", :title="error", :container="'.styles-box'", :type="'danger'", :direction="'Down'", :duration="0")
      label.label 用户名
      p.control.has-icon.has-icon-right
        input.input(minlength="3", maxlength="16", :class="{'is-success': invalid.nickname.status===0, 'is-danger': invalid.nickname.status===1}", type="text", placeholder="长度为3~16", v-model.trim="nickname")
        span.icon.is-small
          i.fa(:class="{'fa-check-circle': invalid.nickname.status===0, 'fa-warning': invalid.nickname.status===1}")
        span.help.is-danger {{invalid.nickname.msg}}
      label.label 邮箱
      p.control.has-icon.has-icon-right
        input.input(:class="{'is-success': invalid.email.status===0, 'is-danger': invalid.email.status===1}", type="text", placeholder="Email", v-model.trim="email")
        span.icon.is-small
          i.fa(:class="{'fa-check-circle': invalid.email.status===0, 'fa-warning': invalid.email.status===1}")
        span.help.is-danger {{invalid.email.msg}}
      hr
      p.control.is-pulled-right
        button.button(@click="reset_base", style="margin-right: 0.5rem;") 还原
        button.button.is-primary(@click="save_base", :disabled="save_base_lock", :class="{'is-loading':ajaxLock}") 提交
</template>

<script>
  import { Modal } from 'vue-bulma-modal'
  import Notification from 'vue-bulma-notification'
  import Vue from 'vue'
  const NotificationComponent = Vue.extend(Notification)
  const openNotification = (propsData = {
    title: '',
    message: '',
    type: '',
    direction: '',
    duration: 4500,
    container: '.notifications'
  }) => {
    return new NotificationComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  export default {
    // :class="{'is-loading':ajaxLock}"
    data () {
      return {
        nickname: '',
        email: '',
        invalid: {
          nickname: {
            status: 0,
            msg: ''
          },
          email: {
            status: 0,
            msg: ''
          }
        },
        error: null,
        ajaxLock: false
      }
    },

    computed: {
      save_base_lock: function () {
        return this.ajaxLock ||
          this.invalid.email.status !== 0 ||
          this.invalid.nickname.status !== 0 ||
          this.nickname === '' ||
          this.email === ''
      }
    },

    watch: {
      nickname: function (val) {
        if (val.length < 3) {
          this.invalid.nickname.status = 1
          this.invalid.nickname.msg = '太短啦~'
          return
        }
        if (val.length > 16) {
          this.invalid.nickname.status = 1
          this.invalid.nickname.msg = '太长啦~'
          return
        }
        this.invalid.nickname.status = 0
        this.invalid.nickname.msg = ''
      },
      email: function (val) {
        if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)) {
          this.invalid.email.status = 1
          this.invalid.email.msg = '邮箱格式貌似不太对_(:зゝ∠)_'
          return
        }
        this.invalid.email.status = 0
        this.invalid.email.msg = ''
      }
    },

    methods: {
      save_base () {
        if (this.save_base_lock) {
          return
        }
        let vm = this
        vm.ajaxLock = true
        this.$http.post(`/p/000000000000000000000000/user`, {nickname: this.nickname, email: this.email})
          .then(res => {
            if (res.data.result === 200) {
              vm.$emit('close')
              openNotification({
                title: '_(:зゝ∠)_',
                message: '新增用户成功。',
                type: 'success'
              })
            } else {
              vm.error = `不是很清楚的错误。[${res.data.result}]`
            }
          }, err => {
            vm.error = err
          })
          .then(() => {
            vm.ajaxLock = false
          })
      },
      reset_base () {
        this.nickname = ''
        this.email = ''
      },
      close () {
        this.$emit('close')
      }
    },

    components: {
      Notification,
      Modal
    },

    props: {
      visible: Boolean
    }
  }
</script>
