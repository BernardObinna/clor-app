<template>
  <section id="landing-how-it-works-section">
    <img
      src="@/assets/images/landing/waves.svg"
      alt="calm waves"
      class="waves-img"
    />
    <div class="row bg-faded-blue content">
      <div>
        <h2 class="sect-header w-lg-43">
          How do I send and request money with Clorza?
        </h2>
        <div class="row text-center">
          <div class="col-12 col-md-3 card-block">
            <h4 class="numbered-heading">
              <img src="@/assets/images/landing/number-1.svg" alt="" />
            </h4>
            <h4 class="sub-heading">Amount</h4>
            <p class="fs-20 fs-16-mob">
              Enter the amount you want to send or receive
            </p>
            <div class="card-img">
              <img
                src="@/assets/images/landing/how-it-works-1.svg"
                alt="Input amount example"
              />
            </div>
          </div>

          <div class="col-12 col-md-3 card-block">
            <h4 class="numbered-heading">
              <img src="@/assets/images/landing/number-2.svg" alt="" />
            </h4>
            <h4 class="sub-heading">Bank</h4>
            <p class="fs-20 fs-16-mob">
              Select your bank and enter your account number
            </p>
            <div class="card-img">
              <img
                src="@/assets/images/landing/how-it-works-2.svg"
                alt="Select bank example"
              />
            </div>
          </div>

          <div class="col-12 col-md-3 card-block">
            <h4 class="numbered-heading">
              <img src="@/assets/images/landing/number-3.svg" alt="" />
            </h4>
            <h4 class="sub-heading">Method</h4>
            <p class="fs-20 fs-16-mob">
              Select a payment method. Either card payment or crypto
            </p>
            <div class="card-img">
              <img
                src="@/assets/images/landing/how-it-works-3.svg"
                alt="Select payment method example"
              />
            </div>
          </div>

          <div class="col-12 col-md-3 card-block">
            <h4 class="numbered-heading">
              <img src="@/assets/images/landing/number-4.svg" alt="" />
            </h4>
            <h4 class="sub-heading">Deposit</h4>
            <p class="fs-20 fs-16-mob">
              Money is deposited into the recipient’s bank account
            </p>
            <div class="card-img">
              <img
                src="@/assets/images/landing/how-it-works-4.svg"
                alt="Success message example"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LandingHowItWorksSection'
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

section {
  position: relative;
  z-index: 10;
}

.content {
  padding-bottom: toRem(143px);
  @include screen('med') {
    padding-bottom: toRem(80px);
  }
}

.numbered-heading {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: toRem(16px);
  max-width: toRem(56px);
  max-height: toRem(56px);
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

.waves-img {
  position: absolute;
  bottom: toRem(57px);
  z-index: 1;
  @include screen('med') {
    display: none;
  }
  //max-height: toRem(222px);
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
  z-index: 2;
  p {
    margin-left: auto;
    margin-right: auto;
    max-width: toRem(276px);
  }
}
</style>
