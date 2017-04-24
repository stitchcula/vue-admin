<template lang="pug">
  div.content.has-text-centered
    h1.is-title.is-bold 登录

    div.columns.is-vcentered
      div.column.is-12-mobile.is-6-tablet.is-offset-3-tablet.is-4-desktop.is-offset-4-desktop
        div.box
          div(v-show="error", style="color:red; word-wrap:break-word;") {{ error }}
          form(v-on:submit.prevent="login")
            label.label 账号/邮箱
            p.control
              input.input(v-model="data.body.username", type="text", placeholder="somebody@shibeta.com")
            label.label 密码
            p.control
              input.input(v-model="data.body.password", type="password", placeholder="password")

            p.control
              label.checkbox
                input(type="checkbox", v-model="data.rememberMe")
                |保持登录

            hr
            p.control
              button.button.is-primary(type="submit") 登录
              button.button.is-default 取消
    footer-bar
</template>

<script>
import JsSHA from 'jssha'
import { FooterBar } from 'components/layout/'

export default {
  data () {
    return {
      data: {
        body: {
          username: null,
          password: null
        },
        rememberMe: false
      },
      error: null
    }
  },
  mounted () {
    if (this.$auth.redirect()) {
      console.log('Redirect from: ' + this.$auth.redirect().from.name)
    }
  },
  methods: {
    login () {
      var redirect = this.$auth.redirect()
      var hasher = new JsSHA('SHA-256', 'TEXT')
      hasher.update(this.data.body.password)
      var password = hasher.getHash('HEX')
      this.$auth.login({
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: this.data.body.username,
          password: password
        },
        rememberMe: this.data.rememberMe,
        redirect: {name: redirect ? redirect.from.name : 'Home'},
        success (res) {
          console.log('Auth Success')
          console.log('Token: ' + this.$auth.token())
          // console.log(res)
        },
        error (err) {
          if (err.response) {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(err.response.status)
            // console.log(err.response.data)
            // console.log(err.response.headers)
            this.error = err.response.data
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message)
          }
          console.log(err.config)
        }
      })
    }
  },
  // filters: {
  //   json: function (value) {
  //     console.log(value)
  //     return value
  //   }
  // }
  components: {
    FooterBar
  }
}
</script>

<style lang="scss" scoped>
  .content {
    padding: 20px;
    .is-title {
      text-transform: capitalize;
      margin: 3rem auto;
    }
    .button {
      margin: 3px;
    }
  }
</style>
