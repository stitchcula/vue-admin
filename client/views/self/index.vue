<template lang="pug">
  div.tile.columns.is-vcentered
    article.tile.column.is-12-mobile.is-6-tablet.is-4-desktop.is-offset-2-desktop
      div.box(style="width:100%;")
        h1.title 基本信息
        label.label ID
        p.control
          input.input(type="text", :value="$auth.user().uin", disabled)
        label.label 用户名
        p.control.has-icon.has-icon-right
          input.input(minlength="3", maxlength="16", :class="{'is-success': invalid.nickname.status===0, 'is-danger': invalid.nickname.status===1}", type="text", placeholder="长度为3~16", v-model.trim="nickname")
          span.icon.is-small
            i.fa(:class="{'fa-check-circle': invalid.nickname.status===0, 'fa-warning': invalid.nickname.status===1, 'fa-spin': invalid.nickname.status===2, 'fa-spinner': invalid.nickname.status===2}")
          span.help.is-danger {{invalid.nickname.msg}}
        label.label 邮箱
        p.control.has-icon.has-icon-right
          input.input(:class="{'is-success': invalid.email.status===0, 'is-danger': invalid.email.status===1}", type="text", placeholder="Email", v-model.trim="email")
          span.icon.is-small
            i.fa(:class="{'fa-check-circle': invalid.email.status===0, 'fa-warning': invalid.email.status===1, 'fa-spin': invalid.email.status===2, 'fa-spinner': invalid.email.status===2}")
          span.help.is-danger {{invalid.email.msg}}
        hr
        p.control.is-pulled-right
          button.button(@click="reset_base") 还原
          button.button.is-primary(@click="save_base", :disabled="save_base_lock") 保存
    article.tile.column.is-12-mobile.is-6-tablet.is-4-desktop
      div.box(style="width:100%;")
        h1.title 修改密码
        label.label 原密码
        p.control.has-icon.has-icon-right
          input.input(minlength="3", maxlength="16", :class="{'is-success': password[0].length>3, 'is-danger': password[0].length<=3&&password[0].length>0}", type="password", v-model.trim="password[0]")
          span.icon.is-small
            i.fa(:class="{'fa-check-circle': password[0].length>3 , 'fa-warning': password[0].length<=3&&password[0].length>0 }")
          span.help.is-danger {{password[0].length<=3&&password[0].length>0?'请输入正确的密码xwx':''}}
        label.label 新密码
        p.control.has-icon.has-icon-right
          input.input(minlength="3", maxlength="16", :class="{'is-success': password[1].length>3, 'is-danger': password[1].length<=3&&password[1].length>0}", type="password", v-model.trim="password[1]")
          span.icon.is-small
            i.fa(:class="{'fa-check-circle': password[1].length>3 , 'fa-warning': password[1].length<=3&&password[1].length>0 }")
          span.help.is-danger {{password[1].length<=3&&password[1].length>0?'请输入合适的密码xwx':''}}
        label.label 再来一次
        p.control.has-icon.has-icon-right
          input.input(minlength="3", maxlength="16", :class="[password[1].length<=3?'':password[1]!==password[2]?'is-danger': 'is-success']", type="password",  v-model.trim="password[2]")
          span.icon.is-small
            i.fa(:class="[password[1].length<=3?'':password[1]!==password[2]?'fa-warning': 'fa-check-circle']")
          span.help.is-danger {{password[1]!==password[2]&&password[1].length>3?'请输入合适的密码xwx':''}}
        hr
        p.control.is-pulled-right
          button.button.is-primary(@click="save_password", :disabled="save_password_lock") 修改
</template>

<script>
  import JsSHA from 'jssha'
  import Notification from 'vue-bulma-notification'
  import _ from 'lodash'
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
    data () {
      return {
        nickname: this.$auth.user().nickname + '',
        email: this.$auth.user().email + '',
        password: [ '', '', '' ],
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
          (this.email === this.$auth.user().email &&
          this.nickname === this.$auth.user().nickname)
      },
      save_password_lock: function () {
        return this.ajaxLock ||
          this.password[0].length < 4 ||
          this.password[1].length < 4 ||
          this.password[1] !== this.password[2]
      }
    },
    watch: {
      error: function (val) {
        openNotification({
          title: '出错啦~',
          message: val,
          type: 'danger'
        })
      },
      nickname: function (val) {
        if (val === this.$auth.user().nickname) {
          this.invalid.nickname.status = 0
          this.invalid.nickname.msg = ''
          return
        }
        let vm = this
        this.invalid.nickname.status = 2
        _.debounce(function () {
          if (val.length < 3) {
            vm.invalid.nickname.status = 1
            vm.invalid.nickname.msg = '太短啦~'
            return
          }
          if (val.length > 16) {
            vm.invalid.nickname.status = 1
            vm.invalid.nickname.msg = '太长啦~'
            return
          }
          vm.$http.put(`/u/${vm.$auth.user().uin}?nickname=${val}`)
            .then(res => {
              if (vm.invalid.nickname.status !== 2) {
                return
              }
              if (res.data.result === 404) {
                vm.invalid.nickname.status = 0
                vm.invalid.nickname.msg = ''
              } else {
                vm.invalid.nickname.status = 1
                vm.invalid.nickname.msg = '已经有人用过啦。。。'
              }
            }, err => {
              vm.error = err
            })
        }, 500)()
      },
      email: function (val) {
        if (val === this.$auth.user().email) {
          this.invalid.email.status = 0
          this.invalid.email.msg = ''
          return
        }
        let vm = this
        this.invalid.email.status = 2
        _.debounce(function () {
          if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)) {
            vm.invalid.email.status = 1
            vm.invalid.email.msg = '邮箱格式貌似不太对_(:зゝ∠)_'
            return
          }
          vm.$http.put(`/u/${vm.$auth.user().uin}?email=${val}`)
            .then(res => {
              if (vm.invalid.email.status !== 2) {
                return
              }
              if (res.data.result === 404) {
                vm.invalid.email.status = 0
                vm.invalid.email.msg = ''
              } else {
                vm.invalid.email.status = 1
                vm.invalid.email.msg = '已经有人用过啦。。。'
              }
            }, err => {
              vm.error = err
            })
        }, 1000)()
      }
    },
    methods: {
      save_base () {
        if (this.save_base_lock) {
          return
        }
        let vm = this
        this.$http.put(`/u/${vm.$auth.user().uin}`, {nickname: this.nickname, email: this.email})
          .then(res => {
            if (res.data.result === 200) {
              openNotification({
                title: '_(:зゝ∠)_',
                message: '保存信息成功。',
                type: 'success'
              })
              vm.$auth.refresh()
            } else {
              vm.error = `不是很清楚的错误。[${res.data.result}]`
            }
          }, err => {
            vm.error = err
          })
      },
      reset_base () {
        this.nickname = this.$auth.user().nickname + ''
        this.email = this.$auth.user().email + ''
      },
      save_password () {
        if (this.save_password_lock) {
          return
        }
        const pwd0 = new JsSHA('SHA-256', 'TEXT')
        pwd0.update(this.password[0])
        const pwd1 = new JsSHA('SHA-256', 'TEXT')
        pwd1.update(this.password[1])
        let vm = this
        this.$http.put(`/u/${vm.$auth.user().uin}`, {password: pwd0.getHash('HEX'), new_password: pwd1.getHash('HEX')})
          .then(res => {
            if (res.data.result === 200) {
              vm.password = [ '', '', '' ]
              openNotification({
                title: '_(:зゝ∠)_',
                message: '修改密码成功。',
                type: 'success'
              })
            } else {
              vm.error = `大概是原密码输错了。[${res.data.result}]`
            }
          }, err => {
            vm.error = err
          })
      }
    },
    components: {
      Notification
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/mixins';

  .control :last-child{
    margin-left: 0.5rem;
  }

</style>
