<template>
  <section
    class="row content text-center d-lg-none"
    id="landing-reasons-to-use-section"
  >
    <div class="px-0">
      <h2 class="sect-header">
        Get set up, send and receive money in a matter of minutes
      </h2>
      <div class="row">
        <div class="col-12 col-lg-4 text-block">
          <img
            src="@/assets/images/landing/reason-to-use-1.svg"
            alt="Input amount example"
            class="sub-heading-img"
          />
          <h4 class="sub-heading">Fast</h4>
          <p>
            Enter the amount you want to send or recieve Enter the amount you
            want to send or receive
          </p>
        </div>

        <div class="col-12 col-lg-4 text-block">
          <img
            src="@/assets/images/landing/reason-to-use-2.svg"
            alt="Select bank example"
            class="sub-heading-img"
          />
          <h4 class="sub-heading">Secure</h4>
          <p>
            Enter the amount you want to send or recieve Enter the amount you
            want to send or receive
          </p>
        </div>

        <div class="col-12 col-lg-4 text-block">
          <img
            src="@/assets/images/landing/reason-to-use-3.svg"
            alt="Select payment method example"
            class="sub-heading-img"
          />
          <h4 class="sub-heading">Easy to use</h4>
          <p>
            Enter the amount you want to send or recieve Enter the amount you
            want to send or receive
          </p>
        </div>
      </div>

      <div class="button-container">
        <button class="btn btn-primary-white w-m-100">Request Money</button>
        <button class="btn btn-primary-blue w-m-100">Send Money</button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LandingReasonToUseSectionMobile'
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.content {
  padding-bottom: toRem(143px);
  @include screen('med') {
    padding-top: toRem(40px);
    padding-bottom: toRem(80px);
  }
}

.sub-heading-img {
  max-width: toRem(40px);
  max-height: toRem(40px);
  margin-top: toRem(32px);
  margin-left: auto;
  margin-right: auto;
}

.sub-heading {
  margin-bottom: toRem(4px);
  margin-top: toRem(4px);
  @include screen('med') {
    font-size: toRem(20px);
    line-height: toRem(32px);
    padding-top: toRem(8px);
    padding-bottom: toRem(8px);
  }
}

h2 {
  max-width: toRem(638px);
  @include screen('med') {
    max-width: toRem(327px);
    font-size: toRem(24px);
    line-height: toRem(30px);
    margin-bottom: 0;
  }
}

.text-block {
  p {
    margin-left: auto;
    margin-right: auto;
    max-width: toRem(276px);
    @include screen('med') {
      //margin: 0;
      text-align: center;
    }
  }
}

.button-container {
  margin-top: toRem(48px);

  button {
    //  mobile
    @include screen('med') {
      margin-top: toRem(16px);
    }

    //  desktop
    @include screen('x-large') {
      margin-right: toRem(20px) !important;
      margin-left: toRem(20px) !important;
    }
  }
}
</style>
