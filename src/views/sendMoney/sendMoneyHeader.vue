<template>
  <div class="header">
    <a
      href="/"
      aria-label="Go back to the home page"
      class="brand-logo mx-lg-0"
    >
      <img src="@/assets/images/icons/clorza-logo.svg" alt="Click to go back" />
    </a>
    <h3 class="heading d-none d-lg-block">Send money</h3>

    <a href="/" aria-label="Go back to the home page" class="close-img-tag">
      <img
        src="@/assets/images/icons/close-icon-black.svg"
        alt="Click to go back"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'SendMoneyHeader'
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

.header {
  display: flex;
  background: white;
  justify-content: space-between;
  align-items: center;
  padding: toRem(20px) toRem(128px);
  @include screen('med') {
    padding: toRem(20px) toRem(32px);
  }
}

.close-img-tag {
  img {
    width: toRem(40px);
    height: toRem(40px);
  }
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
  font-size: toRem(20px);
  font-family: 'Recoleta' !important;
  color: $color-dark-blue;
  margin: 0;
}
</style>