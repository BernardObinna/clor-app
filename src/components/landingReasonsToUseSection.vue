<template>
  <section
    class="row content d-none d-xl-block"
    id="landing-reasons-to-use-section"
  >
    <div>
      <h2 class="sect-header text-center">
        Get set up, send and receive money in a matter of minutes
      </h2>
      <div class="row card-row">
        <div class="col-12 col-lg-4">
          <div class="card-block">
            <div class="shadow-card"></div>
            <div class="gradient-container">
              <div class="text">
                <img
                  src="@/assets/images/landing/reason-to-use-1.svg"
                  alt="Input amount example"
                  class="sub-heading-img"
                />
                <h4 class="sub-heading">Fast</h4>
                <p>
                  Enter the amount you want to send or recieve Enter the amount
                  you want to send or receive
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card-block">
            <div class="shadow-card"></div>

            <div class="gradient-container">
              <div class="text">
                <img
                  src="@/assets/images/landing/reason-to-use-2.svg"
                  alt="Select bank example"
                  class="sub-heading-img"
                />
                <h4 class="sub-heading">Secure</h4>
                <p>
                  Enter the amount you want to send or recieve Enter the amount
                  you want to send or receive
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card-block">
            <div class="shadow-card"></div>
            <div class="gradient-container">
              <div class="text">
                <img
                  src="@/assets/images/landing/reason-to-use-3.svg"
                  alt="Select payment method example"
                  class="sub-heading-img"
                />
                <h4 class="sub-heading">Easy to use</h4>
                <p>
                  Enter the amount you want to send or recieve Enter the amount
                  you want to send or receive
                </p>
              </div>
            </div>
          </div>
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
  name: 'LandingReasonToUseSection'
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

.card-row {
  @include screen('xxx-large') {
    padding-left: 3rem;
    padding-right: 3rem;
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
  margin-bottom: toRem(8px);
  margin-top: toRem(24px);
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

.card-block {
  position: relative;
  max-width: toRem(378px);
  padding-right: 0;
  padding-left: 0;

  margin-left: auto;
  margin-right: auto;
  .gradient-container {
    //background: linear-gradient(to top, #4152fc 40%, #ffffff 72%, #ffffff 0%);
    //background: linear-gradient(to top, rgba(65, 82, 252, 0.4) 0%, #fff 100%);
    background: rgba(65, 82, 252, 0.4);
    border-radius: 16px;
    padding: 2px;
    position: relative;
    z-index: 5;
    max-width: toRem(378px);
    min-width: 100%;
  }
  .text {
    background: #ffffff;
    border-radius: 16px;
    padding: toRem(40px) toRem(32px);
  }

  .shadow-card {
    position: absolute;
    max-width: toRem(378px);
    min-width: 100%;
    height: 100%;
    background: #e4e6fd;
    border-radius: 16px;
    transform: rotate(-3deg);
    z-index: 2;
  }

  //p {
  //  margin-left: auto;
  //  margin-right: auto;
  //  max-width: toRem(276px);
  //}
}

.button-container {
  margin-top: toRem(48px);
  text-align: center;

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
