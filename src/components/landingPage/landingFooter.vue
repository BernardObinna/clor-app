<template>
  <nav class="navbar navbar-light content">
    <div class="dropdown-divider w-100 mb-5"></div>
    <div
      class="
        container-fluid
        flex-nowrap
        px-0
        d-block d-lg-flex
        align-items-start
      "
    >
      <div class="ps-0">
        <router-link
          to="#landing-how-it-works-section"
          class="navbar-brand ps-0"
        >
          <img
            type="button"
            src="@/assets/images/icons/clorza-logo.svg"
            class="w-30 w-lg-60 ps-0"
            alt="Brand logo"
          />
        </router-link>
        <div class="nav-links d-block">
          <router-link
            class="nav-link fs-14-mob ps-0"
            to="#landing-how-it-works-section"
            >support@clorza.com</router-link
          >
          <div>
            <router-link
              class="nav-link d-none d-lg-inline ps-0"
              to="#landing-vendor-section"
              >Tw</router-link
            >
            <router-link class="nav-link d-none d-lg-inline" to="#"
              >Ig</router-link
            >
            <router-link class="nav-link d-none d-lg-inline me-0 pe-0" to="#"
              >Fb</router-link
            >
          </div>
        </div>
      </div>

      <div class="my-4 my-lg-0">
        <div>
          <h5>MARSHALL ISLANDS</h5>
          <p>
            Trust Company Complex, <br />
            Ajeltake Road, Ajeltake Island, <br />
            Majuro, Marshall Islands MH96960.
          </p>
          <p>
            Registration No: 108835
            <span class="d-block">Certification Number: Z-108917- 04/21</span>
          </p>
        </div>

        <div class="mt-4">
          <h5>U.S.A</h5>
          <p>
            16192 Coastal Hwy, <br />
            Lewes, DE 19958, <br />
            U.S.A
          </p>
        </div>
      </div>

      <div>
        <h5>COTONOU</h5>
        <p>
          Lot1075, <br />
          Quartier : Gbèdjromédé, <br />03-BP3527 Republic of Benin
        </p>
        <p>Registration No: RCCM RB / COT / 21 B 30072</p>
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
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

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
    margin-right: toRem(20px);
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
