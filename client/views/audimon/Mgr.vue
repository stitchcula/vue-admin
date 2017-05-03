<template lang="pug">
  div.content.has-text-centered
    p
      img(width="200", src="~assets/logo.svg")
    h1.is-title.is-bold 基尔萌科技
    p
      strong 基于角色的访问权限管理及第三方授权系统。
    p 反正很厉害就是了√
</template>

<script>
  export default {
    data () {
      return this.$store.state.pkg
    }
  }
</script>

<style lang="scss" scoped>
  .is-title {
    text-transform: capitalize;
  }
</style>
