<template lang="pug">
  div#app
    nprogress-container
    navbar(:show="true")
    app-main

</template>

<script>
  import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
  import { Navbar, AppMain } from 'components/layout/'
  import { mapActions } from 'vuex'

  export default {
    components: {
      Navbar,
      AppMain,
      NprogressContainer
    },

    beforeMount () {
      const { body } = document
      const WIDTH = 768
      const RATIO = 3

      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          let isMobile = rect.width - RATIO < WIDTH
          this.toggleDevice(isMobile ? 'mobile' : 'other')
          this.toggleSidebar(!isMobile)
        }
      }

      document.addEventListener('visibilitychange', handler)
      window.addEventListener('DOMContentLoaded', handler)
      window.addEventListener('resize', handler)
    },

    methods: mapActions([
      'toggleDevice',
      'toggleSidebar'
    ])
  }
</script>

<style lang="scss">
  @import '~animate.css';
  .animated {
    animation-duration: .377s;
  }

  @import '~bulma';

  @import '~wysiwyg.css/wysiwyg.sass';

  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome';

  html {
    background-color: whitesmoke;
    overflow-y: auto!important;
  }

  .nprogress-container {
    position: fixed !important;
    width: 100%;
    height: 50px;
    z-index: 2048;
    pointer-events: none;

    #nprogress {
      $color: #48e79a;

      .bar {
        background: $color;
      }
      .peg {
        box-shadow: 0 0 10px $color, 0 0 5px $color;
      }

      .spinner-icon {
        border-top-color: $color;
        border-left-color: $color;
      }
    }
  }
</style>
