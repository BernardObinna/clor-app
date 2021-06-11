<template>
  <nav class="navbar navbar-light content">
    <div class="container-fluid">
      <router-link to="#" class="navbar-brand">Clorza</router-link>
        <img type="button" id="nav-toggle" class="d-lg-none" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" src="@/assets/images/landing/nav-toggle.svg" alt="">
      <div class="collapse navbar-collapse d-lg-none" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="#landing-how-it-works-section">How it works</router-link>
          <router-link class="nav-link" to="#landing-vendor-section">vendor payment</router-link>
          <router-link class="nav-link" to="#">Login</router-link>
          <router-link class="nav-link" to="#">Sign up</router-link>
        </div>
      </div>

      <div class="nav-links d-none d-lg-flex">
        <router-link class="nav-link" to="#landing-how-it-works-section">How it works</router-link>
        <router-link class="nav-link" to="#landing-vendor-section">vendor payment</router-link>
        <router-link class="nav-link btn btn-dark-blue-outline" tag="button" to="#">Login</router-link>
        <router-link class="nav-link btn btn-dark-blue" tag="button" to="#">Sign up</router-link>
      </div>
    </div>
  </nav>

</template>
<script>
export default {
  name: 'LandingHeader'
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

#nav-toggle{
max-width: toRem(32px);
max-height: toRem(32px);
}

.content {
  padding-top: toRem(30px);
  padding-bottom: toRem(30px);
  //@include screen('med') {
  //  padding-bottom: toRem(80px);
  //}
}

.navbar-brand {
  font-style: normal;
  font-weight: 500;
  font-size: toRem(32px);
  line-height: toRem(40px);
  color: $color-primary;
}

.nav-links{
display: flex;
  align-items: center;

  .nav-link{
    font-size: toRem(16px);
    line-height: toRem(20px);
    color: $color-dark-blue;
    margin-right: toRem(40px);
  }

}

.navbar-toggler{
  border: 1px solid $color-primary;
  border-radius: 60px;
}

.numbered-heading {
  background: white;
  border-radius: 50%;
  color: $color-primary;
  width: toRem(56px);
  padding: toRem(13px) toRem(24px) toRem(13px) toRem(21px);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: toRem(16px);
}

.card-img {
  max-width: toRem(276px);
  max-height: toRem(280px);
  border-radius: 16px;
  margin-top: toRem(32px);
  margin-left: auto;
  margin-right: auto;

  @include screen('med') {
    margin-bottom: toRem(48px);
  }
}

.sub-heading {
  margin-bottom: toRem(8px);
  @include screen('med') {
    font-size: toRem(20px);
    line-height: toRem(32px);
  }
}

h2 {
  max-width: toRem(488px);
  @include screen('med') {
    font-size: toRem(24px);
    line-height: toRem(30px);
  }
}

.card-block {
  p {
    margin-left: auto;
    margin-right: auto;
    max-width: toRem(276px);
  }
}
</style>
