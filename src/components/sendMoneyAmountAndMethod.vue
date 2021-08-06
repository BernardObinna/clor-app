<template>
  <form class="form-block" @submit.prevent="submit()">
    <div id="payment-method-block">
      <!--<h5 class="title">Amount and Method</h5>-->
      <h5 class="title">Amount</h5>

      <!--<label class="form-label">How do you want to pay?</label>-->
      <!--<div class="payment-method">-->
      <!--  <button-->
      <!--    class="btn btn-grey-outline"-->
      <!--    :class="{ selected: cryptoSelected }"-->
      <!--    @click="selectPaymentMethod('crypto')"-->
      <!--    type="button"-->
      <!--  >-->
      <!--    <img-->
      <!--      class="me-1"-->
      <!--      src="@/assets/images/icons/crypto-icon.svg"-->
      <!--      alt="Fancy image"-->
      <!--      v-if="!cryptoSelected"-->
      <!--    />-->

      <!--    <img-->
      <!--      class="me-1"-->
      <!--      src="@/assets/images/icons/crypto-icon-black.svg"-->
      <!--      alt="Fancy image"-->
      <!--      v-else-->
      <!--    />-->
      <!--    Crypto-->
      <!--  </button>-->

      <!--  <button-->
      <!--    class="btn btn-grey-outline"-->
      <!--    :class="{ selected: cardSelected }"-->
      <!--    @click="selectPaymentMethod('card')"-->
      <!--    type="button"-->
      <!--  >-->
      <!--    <img-->
      <!--      class="me-1"-->
      <!--      src="@/assets/images/icons/credit-card-icon.svg"-->
      <!--      alt="Fancy image"-->
      <!--      v-if="!cardSelected"-->
      <!--    />-->

      <!--    <img-->
      <!--      class="me-1"-->
      <!--      src="@/assets/images/icons/credit-card-icon-black.svg"-->
      <!--      alt="Fancy image"-->
      <!--      v-else-->
      <!--    />-->
      <!--    Card-->
      <!--  </button>-->
      <!--</div>-->

      <div class="limit-text">
        You can send between $10 and $2,500 at any given time. If you want to
        send more than this amount,
        <router-link to="#"> Log in </router-link>
        or
        <router-link to="#"> Create an account </router-link>.
      </div>

      <div class="mt-28">
        <label for="send-money-amount" class="form-label">Amount</label>
        <div class="input-group send-input">
          <input
            type="text"
            class="form-control border-end-0"
            id="send-money-amount"
            placeholder="0.00"
            aria-label="Amount you want to send"
            v-model="form.amount"
            v-money="money"
          />
          <span class="input-group-text" id="send-money-sending-currency-flag">
            <img
              class="me-1"
              src="@/assets/images/landing/us-flag.svg"
              alt="U.S flag"
            />
            USD</span
          >
        </div>
      </div>

      <div class="converted-amount">
        <p>NGN {{ amountToBeReceived }}</p>

        <p>1 USD = {{ dollarRate }} NGN</p>
      </div>

      <div class="mt-32 text-lg-end">
        <button class="btn btn-primary-blue w-m-100" type="submit">
          Continue
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from '@vue/composition-api'
import UtilsService from '../utils/UtilsService'

export default {
  name: 'SendMoneyAmountAndMethod',
  props: {
    details: Object
  },
  setup(props, { root }) {
    const store = root.$store

    const data = reactive({
      form: {
        amount: 0,
        paymentMethod: 'card'
      },

      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      }

      // dollarRate: 478
    })

    onMounted(() => {
      // if (props.details.paymentMethod) {
      data.form = props.details
      // }
    })

    const dollarRate = computed(() => {
      return store.getters['sendMoney/getDollarRates']
    })

    const amountToBeReceived = computed(() => {
      // console.log('the amount', UtilsService.formatMoneyMask(data.form.amount))
      console.log(
        'the amount',
        Number(UtilsService.formatMoneyMask(data.form.amount))
      )
      return dollarRate * Number(UtilsService.formatMoneyMask(data.form.amount))
    })

    const showBankInfoBlock = computed(() => {
      return (
        data.form.bank &&
        data.form.accountNumber &&
        data.form.recipientEmail &&
        data.mode !== 'recipientInformation'
      )
    })

    const cardSelected = computed(() => {
      return data.form.paymentMethod === 'card'
    })

    const cryptoSelected = computed(() => {
      return data.form.paymentMethod === 'crypto'
    })

    function selectPaymentMethod(method) {
      data.form.paymentMethod = method
    }

    function submit() {
      this.$emit('submit', data.form)
    }

    return {
      ...toRefs(data),
      amountToBeReceived,
      showBankInfoBlock,
      dollarRate,
      cardSelected,
      cryptoSelected,
      selectPaymentMethod,
      submit
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.title {
  margin-bottom: toRem(24px);
  font-family: 'Circular', sans-serif !important;
}

.form-block {
  padding: toRem(20px) toRem(32px) toRem(20px);
  //background: rgba(206, 208, 213, 0.04);
  background: white;
  border: 1px solid rgba(206, 208, 213, 0.4);
  box-sizing: border-box;
  max-width: toRem(456px);

  @include screen('med') {
    //background: none;
    border: none;
    //margin-top: 0;
    padding-top: toRem(20px);
  }
  @include screen('large') {
    border-radius: 8px;
    margin: toRem(60px) auto 0;
  }

  p,
  h5 {
    color: $color-dark-blue;
    @include screen('med') {
      text-align: center;
    }

    @include screen('large') {
      text-align: left;
    }
  }

  .btn {
    padding: toRem(12px) toRem(26px) toRem(12px) toRem(27px);
  }

  .form-label {
    text-align: left !important;
  }

  span.input-group-text {
    border-left: none;

    img {
      @include screen('med') {
        height: 2rem;
      }
    }
  }

  .converted-amount {
    display: flex;
    justify-content: space-between;
    background: rgba(81, 210, 48, 0.08);
    border: 1px solid rgba(81, 210, 48, 0.4);
    box-sizing: border-box;
    border-radius: 7px;
    padding: toRem(8px) toRem(16px);
    margin-top: toRem(16px);
    p {
      margin: 0;
      @include screen('med') {
        font-size: toRem(14px);
      }
    }
  }

  #payment-method-block {
    margin-bottom: toRem(24px);

    @include screen('med') {
      margin-bottom: 0;
    }

    .payment-method {
      display: flex;
      justify-content: space-between;
      button {
        width: 48%;
        min-height: toRem(56px);
        box-sizing: border-box;
        border-radius: 8px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        @include screen('med') {
          font-size: toRem(14px);
        }

        img {
          width: toRem(24px);
          height: toRem(24px);
        }
      }

      .selected {
        background: rgba(85, 100, 245, 0.08) !important;
        border: 1px solid #5564f5 !important;
        color: $color-dark-blue !important;
      }
    }
  }

  .limit-text {
    text-align: center;
    margin-top: toRem(16px);
    background: rgba(206, 208, 213, 0.08);
    border: 1px solid rgba(206, 208, 213, 0.24);
    box-sizing: border-box;
    border-radius: 8px;
    padding: toRem(16px);

    a {
      text-decoration: none;
      padding-bottom: 4px;
      border-bottom: 1px solid #5564f5;
      color: $color-primary;
    }
  }
}
</style>
