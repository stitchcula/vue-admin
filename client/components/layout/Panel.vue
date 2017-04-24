<template lang="pug">
  div
    sidebar(:show="sidebar.opened && !sidebar.hidden")
    section.panel
      div.container.is-fluid.is-marginless.app-content
        levelbar
        transition(mode="out-in",
            enter-active-class="fadeIn",
            leave-active-class="fadeOut",
            appear)
          router-view.animated
        footer-bar
</template>

<script>
  import Levelbar from './Levelbar'
  import { Sidebar, FooterBar } from 'components/layout/'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Levelbar,
      FooterBar,
      Sidebar
    },

    computed: mapGetters({
      sidebar: 'sidebar'
    })
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/variables';
  @import '~bulma/sass/utilities/mixins';

  .panel {
    margin-left: 180px;
    transform: translate3d(0, 0, 0);

    @include mobile() {
      margin-left: 0;
    }

  }

  .app-content {
    padding: 20px;
  }
</style>
