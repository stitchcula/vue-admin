<template lang="pug">
  div.sc-ab
    div.sc-ab-oprt(v-if="visible")
      span.is-icon.is-pulled-right
        a(@click="edit")
          i.fa.fa-pencil-square-o
      span.is-icon.is-pulled-right
        a(@click="remove")
          i.fa.fa-trash-o
      span.is-icon.is-pulled-right
        a(@click="create")
          i.fa.fa-plus
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
      create () {
        this.$emit('create')
      },
      remove () {
        this.$emit('remove')
      },
      edit () {
        this.$emit('edit')
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
