<template>
  <nav class="navbar navbar-light content">
    <div class="container-fluid flex-nowrap px-0">
      <router-link to="#landing-how-it-works-section" class="navbar-brand">
        <img
          type="button"
          src="@/assets/images/icons/clorza-logo.svg"
          alt="Brand logo"
        />
      </router-link>
      <div class="nav-links">
        <router-link
          class="nav-link fs-14-mob"
          to="#landing-how-it-works-section"
          >support@clorza.com</router-link
        >
        <router-link
          class="nav-link d-none d-lg-inline"
          to="#landing-vendor-section"
          >Tw</router-link
        >
        <router-link class="nav-link d-none d-lg-inline" to="#">Ig</router-link>
        <router-link class="nav-link d-none d-lg-inline me-0 pe-0" to="#"
          >Fb</router-link
        >
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'LandingFooter'
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

#nav-toggle {
  max-width: toRem(32px);
  max-height: toRem(32px);
}

.content {
  padding-top: toRem(30px);
  padding-bottom: toRem(30px);
}

.navbar-brand {
  font-style: normal;
  font-weight: 500;
  font-size: toRem(32px);
  line-height: toRem(40px);
  color: $color-primary;
  @include screen('med') {
    font-size: toRem(24px);
    line-height: toRem(30px);
  }
}

.nav-links {
  display: flex;
  align-items: center;

  .nav-link {
    font-size: toRem(16px);
    line-height: toRem(20px);
    color: $color-dark-blue;
    margin-right: toRem(40px);
    @include screen('med') {
      margin: 0;
      padding-right: 0;
    }
  }
}

.navbar-toggler {
  border: 1px solid $color-primary;
  border-radius: 60px;
}
</style>
