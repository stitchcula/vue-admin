<template lang="pug">
  section.app-main
    precheck
    transition(mode="out-in",
        enter-active-class="fadeIn",
        leave-active-class="fadeOut",
        appear)
      router-view.animated
</template>

<script>
  import Precheck from '../../views/auth/Precheck.vue'
  export default {
    components: {
      Precheck
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/variables';
  @import '~bulma/sass/utilities/mixins';

  .app-main {
    padding-top: 50px;
  }

</style>
