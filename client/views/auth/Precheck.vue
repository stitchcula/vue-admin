<template lang="pug">
  div#precheck
    div.content.has-text-centered
      p.logo
        img(width="200", src="~assets/logo.svg")

      p 请稍等…
</template>

<style lang="stylus" scoped>
  #precheck
    position fixed
    height 100%
    width 100%
    background white
    z-index 9999
    .logo
      margin-top 20%
      img
        padding-top 45px
        padding-right 1px
        animation circle 1s infinite ease
      @keyframes circle
        0%
          transform rotate(0deg)
        100%
          transform rotate(-120deg)
</style>
