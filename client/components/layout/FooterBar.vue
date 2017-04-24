<template lang="pug">
  footer.footer
    div.container
      div.content.has-text-centered
        p.social
          a(:href="'https://github.com/' + repository")
            span.icon
              i.fa.fa-github
        p
          span.icon
            i.fa.fa-code
          |&nbsp;by&nbsp;
          a(href="https://github.com/stitchcula") StitchCula
          |.
        p © 2017 基尔萌科技.
</template>

<script>
  export default {

    data () {
      return this.$store.state.pkg
    }

  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/mixins';

  .footer {
    padding-bottom: 3rem;

    @include mobile() {
      margin-left: 0;
    }

    .social a {
      border-bottom: none !important;
    }

    .fa.fa-heart {
      color: red;
    }
  }
</style>
