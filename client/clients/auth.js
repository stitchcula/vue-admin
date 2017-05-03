export default {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {token: token})
    },
    response: function (res) {
      return res.data.token
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: '/u', method: 'PUT', fetchUser: true },
  logoutData: { url: '/u', method: 'DELETE' },
  refreshData: { url: '/u', method: 'GET', enabled: false },
  fetchData: { url: '/u', method: 'GET', enabled: true }
}
