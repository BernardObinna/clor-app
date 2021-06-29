<template>
  <div class="header">
    <router-link
      :to="{ name: 'home' }"
      aria-label="Go back to the home page"
      class="brand-logo mx-auto mx-lg-0"
    >
      <img src="@/assets/images/icons/clorza-logo.svg" alt="Click to go back" />
    </router-link>
    <h3 class="heading d-none d-lg-block">Send money</h3>

    <router-link
      :to="{ name: 'home' }"
      aria-label="Go back to the home page"
      class="close-img-tag d-none d-lg-block"
    >
      <img
        src="@/assets/images/icons/close-icon-black.svg"
        alt="Click to go back"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.header {
  display: flex;
  background: white;
  justify-content: space-between;
  padding: toRem(20px) toRem(128px);
}

.close-img-tag {
  img {
    width: toRem(40px);
    height: toRem(40px);
  }
  //
  //@include screen('med') {
  //  top: toRem(14px);
  //  left: toRem(12px);
  //}
}

.brand-logo {
  width: toRem(90px);
  height: toRem(40px);
  img {
    width: 100%;
  }
}

.heading {
  text-align: center;
  font-weight: 500;
  font-family: 'Recoleta' !important;
  color: $color-dark-blue;
  margin: 0;
  //padding: toRem(24px) 0;

  @include screen('med') {
    //padding: toRem(12px) 0;
  }
}
</style>
