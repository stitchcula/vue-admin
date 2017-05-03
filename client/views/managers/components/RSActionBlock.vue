<template lang="pug">
  div.sc-ab
    div.sc-ab-oprt(v-if="visible")
      span.is-icon.is-pulled-right
        a(@click="save")
          i.fa.fa-floppy-o
      span.is-icon.is-pulled-right
        a(@click="reset")
          i.fa.fa-repeat
    div.sc-ab-content
      div
        slot 由于未知的原因不支持√
</template>

<script>
  export default {
    props: {
      visible: Boolean
    },

    methods: {
      save () {
        this.$emit('save')
      },
      reset () {
        this.$emit('reset')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .sc-ab
    .sc-ab-oprt
      >.is-icon
        margin 0 0.5rem
        .fa
          font-size 1.3rem
    .sc-ab-content
      height 100%
      padding-top 1.5rem
      >div
        height 100%
        overflow scroll
</style>
