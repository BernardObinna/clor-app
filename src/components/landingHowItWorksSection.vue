<template>
  <section class="row bg-faded-blue content">
    <div>
      <h2 class="sect-header w-lg-40">
        How do I send and request money with Clorza?
      </h2>
      <div class="row text-center">
        <div class="col-3 card-block">
          <h4 class="numbered-heading">1</h4>
          <h4 class="sub-heading">Amount</h4>
          <p class="fs-20">Enter the amount you want to send or receive</p>
          <img
            src="@/assets/images/landing/how-it-works-1.svg"
            alt="Input amount example"
            class="card-img"
          />
        </div>

        <div class="col-3 card-block">
          <h4 class="numbered-heading">2</h4>
          <h4 class="sub-heading">Bank</h4>
          <p class="fs-20">Select your bank and enter your account number</p>
          <img
            src="@/assets/images/landing/how-it-works-2.svg"
            alt="Select bank example"
            class="card-img"
          />
        </div>

        <div class="col-3 card-block">
          <h4 class="numbered-heading">3</h4>
          <h4 class="sub-heading">Method</h4>
          <p class="fs-20">
            Select a payment method. Either card payment or crypto
          </p>
          <img
            src="@/assets/images/landing/how-it-works-3.svg"
            alt="Select payment method example"
            class="card-img"
          />
        </div>

        <div class="col-3 card-block">
          <h4 class="numbered-heading">3</h4>
          <h4 class="sub-heading">Deposit</h4>
          <p class="fs-20">Receive your money into your Naira bank account</p>
          <img
            src="@/assets/images/landing/how-it-works-4.svg"
            alt="Success message example"
            class="card-img"
          />
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
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.content {
  padding-bottom: toRem(143px);
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
  width: toRem(276px);
  height: toRem(280px);
  border-radius: 16px;
  margin-top: toRem(32px);
}

.sub-heading {
  margin-bottom: toRem(8px);
}

h2 {
  max-width: toRem(488px);
}

.card-block {
  p {
    margin-left: auto;
    margin-right: auto;
    max-width: toRem(276px);
  }
}
</style>
