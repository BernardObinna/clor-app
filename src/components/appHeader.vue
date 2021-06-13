<template>
  <div>
    <router-link
      :to="{ name: 'home' }"
      aria-label="Go back to the home page"
      class="close-img-tag"
    >
      <img src="@/assets/images/icons/close-icon.svg" alt="Click to go back" />
    </router-link>
    <h3 class="brand">Clorza</h3>
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

.close-img-tag {
  position: absolute;
  top: toRem(28px);
  left: toRem(24px);
  img {
    width: toRem(40px);
    height: toRem(40px);
  }

  @include screen('med') {
    top: toRem(14px);
    left: toRem(12px);
  }
}

.brand {
  text-align: center;
  font-weight: bold;
  color: white;
  padding: toRem(24px) 0;
  margin-bottom: 0;

  @include screen('med') {
    padding: toRem(12px) 0;
  }
}
</style>
