<template>
  <section class="row content" id="landing-send-money-section">
    <img
      src="@/assets/images/landing/dotted-circle.svg"
      alt="Fancy image"
      class="dotted-circle-img d-none d-lg-inline"
    />
    <div class="col-12 col-lg-6">
      <div class="text-block mx-auto mx-lg-0">
        <div class="new-prompt" v-if="false">
          <b class="new-badge">New</b>
          <p class="mb-0">
            Send more than $1000 to Nigeria
            <img
              src="@/assets/images/icons/right-angle.svg"
              alt=""
              class="right-angle-img"
            />
          </p>
        </div>
        <h1>
          Send Money from <span class="gradient-text usa-text">USA</span> to
          Nigeria with Card or Crypto
        </h1>
        <p>
          Send money from USA and receive it in your Nigerian bank account
          <span class="d-none d-lg-inline">without creating an account</span>.
        </p>
      </div>
    </div>

    <div class="col-12 col-lg-6">
      <div class="form-container ms-lg-auto me-xl-5">
        <div class="shadow-card"></div>
        <img
          src="@/assets/images/landing/quarter-pie.svg"
          alt="Fancy image"
          class="pie-img"
        />
        <div class="gradient-container">
          <form class="form-block" @submit.prevent="submit()">
            <div class="d-flex">
              <div class="input-group input-group-lg">
                <div class="form-floating send-input">
                  <input
                    type="text"
                    class="form-control bg-white"
                    id="floatingInput-send-amount"
                    placeholder="name@example.com"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    v-money="moneySend"
                    :disabled="gettingRates"
                    v-model="sendAmount"
                  />
                  <label for="floatingInput-send-amount">You send</label>
                  <span class="input-group-text" id="send-currency">
                    <img
                      class="me-1"
                      src="@/assets/images/landing/us-flag.svg"
                      alt="U.S flag"
                    />
                    USD</span
                  >
                </div>
              </div>
            </div>

            <div class="conversion-rate text-center">
              <div
                class="spinner-border text-primary"
                role="status"
                v-if="gettingRates"
              >
                <span class="sr-only d-none">Loading...</span>
              </div>

              <p v-else>
                1 USD
                <img
                  src="@/assets/images/icons/conversion-rate-icon.svg"
                  alt="conversion-icon"
                  class="conversion-img"
                />
                {{ dollarRates }} NGN
              </p>
            </div>

            <div class="d-flex">
              <div class="input-group input-group-lg">
                <div class="form-floating receive-input">
                  <input
                    type="text"
                    class="form-control bg-white"
                    id="floatingInput"
                    placeholder="name@example.com"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    v-money="moneyReceive"
                    :value="calculateNaira"
                    disabled
                  />
                  <label for="floatingInput">Recipient gets</label>
                  <span class="input-group-text" id="receive-currency">
                    <img
                      class="me-1"
                      src="@/assets/images/landing/ng-flag.svg"
                      alt="Nigerian flag"
                    />
                    NGN</span
                  >
                </div>
              </div>
            </div>

            <div class="card-fee">
              <p class="text-grey-59e">Card Fee</p>
              <p class="ms-auto">3.5%</p>
            </div>

            <!--<div class="d-flex">-->
            <!--  <p class="text-grey-59e">Crypto Fee</p>-->
            <!--  <p class="ms-auto">Depends on currency</p>-->
            <!--</div>-->

            <div class="button-container">
              <button class="btn btn-primary-white w-m-100" disabled>
                Request Money
              </button>
              <button
                class="btn btn-primary-blue w-m-100"
                :disabled="gettingRates"
                type="submit"
              >
                Send Money
              </button>
            </div>
          </form>
        </div>
        <img
          src="@/assets/images/landing/dot-group.svg"
          alt="Fancy image"
          class="dot-group-img"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { onMounted, reactive, toRefs, computed } from '@vue/composition-api'
import UtilsService from '../utils/UtilsService'

export default {
  name: 'LandingSendMoneySection',
  setup(props, { root }) {
    const store = root.$store
    const baseMask = {
      decimal: '.',
      thousands: ',',
      prefix: 'R$ ',
      suffix: '',
      precision: 0,
      masked: false /* doesn't work with directive */
    }

    const data = reactive({
      moneyReceive: {
        ...baseMask,
        prefix: '₦ '
      },

      moneySend: {
        ...baseMask,
        prefix: '$ '
      },
      sendAmount: '',
      dollarRates: '',
      gettingRates: false
    })

    //mounted
    onMounted(async () => {
      data.gettingRates = true
      await store.dispatch('sendMoney/getRates')
      data.dollarRates = store.getters['sendMoney/getDollarRates']
      data.gettingRates = false
    })

    //computed
    const calculateNaira = computed(() => {
      return (
        data.dollarRates *
        Number(UtilsService.formatMoneyMask(data.sendAmount, true))
      )
    })

    //methods
    function submit() {
      this.$router.push({
        name: 'send-money',
        params: { amount: UtilsService.formatMoneyMask(data.sendAmount) }
      })
    }

    return { ...toRefs(data), submit, calculateNaira }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.content {
  padding-bottom: toRem(203px);
  padding-top: toRem(140px);
  position: relative;
  @include screen('med') {
    padding-top: toRem(80px);
    padding-bottom: toRem(80px);
  }

  .dotted-circle-img {
    position: absolute;
    max-width: toRem(320px);
    max-height: toRem(320px);
    bottom: -11%;
    z-index: 1;
  }
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

.text-block {
  max-width: toRem(580px);
  @include screen('x-large') {
    padding-top: toRem(70px);
  }

  .new-prompt {
    display: flex;
    background: rgba(81, 210, 48, 0.16);
    border: 1px solid rgba(81, 210, 48, 0.2);
    box-sizing: border-box;
    border-radius: 16px;
    margin-bottom: toRem(16px);
    font-size: toRem(14px);
    line-height: toRem(20px);
    .right-angle-img {
      width: toRem(8px);
      height: toRem(12px);
      margin-left: toRem(8px);
    }

    .new-badge {
      background: #51d230;
      border-radius: 16px;
      color: white;
      margin: toRem(4px) toRem(8px) toRem(4px) toRem(4px);
      padding: toRem(4px) toRem(12px) toRem(2px);
    }
  }

  h1 {
    @include screen('med') {
      font-size: toRem(32px);
      line-height: toRem(48px);
      text-align: center;
    }
  }

  .usa-text {
    background-color: #f3ec78;
    background-image: linear-gradient(45deg, #68ffa4, #ff6ae7);
    margin-top: toRem(16px);
    font-family: 'Recoleta', 'Circular', sans-serif !important;
    font-weight: 700;
  }

  p {
    font-size: toRem(24px);
    line-height: toRem(40px);
    @include screen('med') {
      font-size: toRem(16px);
      line-height: toRem(24px);
      text-align: center;
    }
  }
}

.form-container {
  position: relative;
  max-width: toRem(479px);

  @include screen('med') {
    max-width: toRem(327px);
    margin-top: toRem(40px);
    margin-right: auto;
    margin-left: auto;
  }

  .shadow-card {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #e4e6fd;
    border-radius: 16px;
    transform: rotate(-3deg);
    z-index: 2;
  }

  .pie-img {
    z-index: 1;

    position: absolute;
    top: -4rem;
    left: -4rem;
    max-width: toRem(160px);
    max-height: toRem(160px);

    @include screen('med') {
      max-width: toRem(120px);
      max-height: toRem(120px);
      top: -3rem;
      left: -3rem;
    }
  }

  .dot-group-img {
    z-index: 1;
    position: absolute;
    bottom: -4.5rem;
    right: -4.9rem;
    max-width: toRem(176px);
    max-height: toRem(176px);

    @include screen('med') {
      bottom: -1.47rem;
      right: -0.8rem;
      max-width: toRem(120px);
      max-height: toRem(120px);
    }
  }

  .gradient-container {
    //background: linear-gradient(to top, #4152fc 40%, #ffffff 72%, #ffffff 0%);
    //background: linear-gradient(to top, rgba(65, 82, 252, 0.4) 0%, #fff 100%);
    background: rgba(65, 82, 252, 0.4);
    border-radius: 16px;
    padding: 2px;
    position: relative;
    z-index: 10;
    //width: toRem(378px);
  }

  .form-block {
    //position: relative;
    padding: toRem(30px) toRem(20px) toRem(40px);
    //border: 1px solid rgba(12, 17, 66, 0.08);
    box-sizing: border-box;
    box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    background: white;
    //z-index: 10;

    @include screen('med') {
      padding: toRem(24px) toRem(24px) toRem(32px);
    }

    .conversion-img {
      width: toRem(24px);
      height: toRem(24px);
      margin-left: toRem(8px);
      margin-right: toRem(8px);
    }

    .form-floating {
      display: flex;
      width: 100%;
    }

    .conversion-rate {
      text-align: center;
      margin: toRem(42px) 0;
      @include screen('med') {
        margin: toRem(40px) 0;
      }
    }

    .card-fee {
      display: flex;
      margin-top: toRem(24px);
      margin-bottom: toRem(16px);
    }

    p {
      margin-bottom: 0;
    }

    input {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-right: none;
      font-weight: 500;
      min-height: toRem(80px);
      font-size: toRem(24px);
      line-height: toRem(30px);
      padding-bottom: 0 !important;
    }

    label {
      font-size: toRem(14px);
      line-height: toRem(18px);
      color: $color-faded-grey;
      padding-top: toRem(20px);
    }
  }

  .button-container {
    margin-top: toRem(20px);

    @include screen('x-large') {
      display: flex;
      justify-content: space-between;
      margin-top: toRem(40px);
    }
    button {
      //  mobile
      @include screen('med') {
        margin-top: toRem(16px);
      }

      //  desktop
      @include screen('x-large') {
        width: 48%;
      }
    }
  }
}
</style>
