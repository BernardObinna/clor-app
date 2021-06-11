<template>
  <section class="content" id="landing-vendor-section">
    <div class="row vendor-container">

      <div class="col-12 d-lg-none">
        <img
            src="@/assets/images/landing/vendor-img-mixed.svg"
            alt=""
        />
      </div>

      <div class="col-12 col-lg-6">
        <div class="text-block">
          <h3 class="vendor-header text-white">
            Want to <br />
            pay your vendor?
          </h3>
          <p class="text-white fs-20">
            With Clorza, you can pay your vendors from anywhere across the
            world. You give us the money and we handle the leg work for you
          </p>
          <button class="btn btn-dark-blue-outline fs-20">Coming soon</button>
        </div>
      </div>

      <div class="col-12 col-lg-4 img-block d-none d-lg-block">
        <img
          src="@/assets/images/landing/vendor-img-1.svg"
          alt=""
          class="img-front"
        />
        <img
          src="@/assets/images/landing/vendor-img-2.svg"
          alt=""
          class="img-back"
        />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LandingVendorSection'
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.content {
  padding-bottom: toRem(143px);
  @include screen('med') {
    padding-bottom: toRem(80px);
  }
}

.vendor-container {
  padding-bottom: toRem(74px);
  padding-left: toRem(64px);
  padding-top: toRem(54px);
  background: $color-dark-blue;
  border-radius: 24px;

  @include screen('med') {
    padding: toRem(64px) toRem(16px) ;
  }
}

.text-block {
  max-width: toRem(411px);
  p {
    margin-top: toRem(16px);
    margin-bottom: toRem(32px);
  }

  @include screen('med') {
    margin-top: toRem(48px);
    text-align: center;
  }
}

.img-block {
  position: relative;

  .img-front {
    z-index: 10;
    top: toRem(36px);
    max-width: toRem(276px);
    position: absolute;
  }

  .img-back {
    z-index: 1;
    left: toRem(152px);
    max-width: toRem(276px);
    position: absolute;
  }
}
</style>
