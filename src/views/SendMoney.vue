<template>
  <div class="page">
    <app-header />

    <div class="app-body">
      <h4 class="title">Send money</h4>
      <form class="form-block" @submit.prevent="proceed()">
        <!--recipient information-->
        <div
          v-if="mode == 'recipientInformation'"
          id="recipient-information-block"
        >
          <h5>Recipient Information {{ mode }}</h5>
          <p>Enter the information of who you’re sending money to</p>

          <div class="my-28">
            <label for="bank" class="form-label">Bank</label>
            <select
              class="form-select"
              aria-label="Select bank name"
              id="bank"
              v-model="form.bank"
            >
              <option value="" disabled selected>Select bank name</option>
              <option
                :value="bank.id"
                v-for="(bank, index) in banks"
                :key="index"
              >
                {{ bank.name }}
              </option>
            </select>
          </div>

          <div class="my-28">
            <label for="account-number" class="form-label"
              >Account number</label
            >
            <input
              type="text"
              class="form-control"
              id="account-number"
              aria-label="account number"
              placeholder="Enter account number"
              v-model="form.accountNumber"
            />
          </div>

          <div class="">
            <label for="recipient-email" class="form-label"
              >Recipient Email</label
            >
            <input
              type="email"
              class="form-control"
              id="recipient-email"
              aria-label="Recipient's email"
              placeholder="Enter email address"
              v-model="form.recipientEmail"
            />
          </div>
        </div>

        <!--Amount and method-->
        <div v-if="mode == 'amountAndMethod'" id="payment-method-block">
          <h5>Amount and Method</h5>
          <p>How much do want to send and how ?</p>

          <label class="form-label">How do you want to pay?</label>
          <div class="payment-method">
            <button
              class="btn btn-grey-outline"
              :class="{ selected: cryptoSelected }"
              @click="selectPaymentMethod('crypto')"
              type="button"
            >
              <img
                class="me-1"
                src="@/assets/images/icons/crypto-icon.svg"
                alt="Fancy image"
              />
              Crypto
            </button>

            <button
              class="btn btn-grey-outline"
              :class="{ selected: cardSelected }"
              @click="selectPaymentMethod('card')"
              type="button"
            >
              <img
                class="me-1"
                src="@/assets/images/icons/credit-card-icon.svg"
                alt="Fancy image"
              />
              Card
            </button>
          </div>

          <div class="limit-text">
            You can send between $10 and $2,500 at any given time. If you want
            to send more than this amount,
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
              <span
                class="input-group-text"
                id="send-money-sending-currency-flag"
              >
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

          <div class=""></div>
        </div>

        <div class="mt-24">
          <button class="btn btn-primary-blue w-m-100" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/appHeader'
import { reactive, computed, toRefs } from '@vue/composition-api'
export default {
  setup() {
    const data = reactive({
      recipient: true,
      form: {
        bank: '',
        accountNumber: '',
        recipientEmail: '',
        amount: 0,
        paymentMethod: ''
      },

      banks: [
        { id: 'st', name: 'Sterling bank' },
        { id: 'gtb', name: 'GTBank' },
        { id: 'acs', name: 'Access Bank' }
      ],

      money: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      },

      dollarRate: 478,
      mode: 'recipientInformation'
    })

    const amountToBeReceived = computed(() => {
      return (data.dollarRate * data.form.amount).toFixed(2)
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

    function proceed() {
      data.mode = 'amountAndMethod'
      console.log(data.mode)
    }

    return {
      ...toRefs(data),
      amountToBeReceived,
      cardSelected,
      cryptoSelected,
      selectPaymentMethod,
      proceed
    }
  },
  name: 'SendMoney',
  components: { AppHeader }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.page {
  background: $color-primary;
  padding: 0 toRem(16px) toRem(16px);
  min-height: 100vh;
}

.app-body {
  color: $color-heading-black;
  background: #fff;
  border-radius: 16px;
  min-height: 91vh;

  .title {
    text-align: center;
    padding-top: toRem(80px);
    @include screen('med') {
      padding-top: toRem(40px);
    }
  }

  .form-block {
    padding: toRem(40px);
    background: rgba(206, 208, 213, 0.04);
    border: 1px solid rgba(206, 208, 213, 0.4);
    box-sizing: border-box;
    border-radius: 16px;
    max-width: toRem(456px);
    margin: toRem(32px) auto 0;

    @include screen('med') {
      background: none;
      border: none;
      margin-top: 0;
      padding-top: toRem(20px);
    }

    p,
    h5 {
      @include screen('med') {
        text-align: center;
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
      margin-bottom: toRem(44px);
      .payment-method {
        display: flex;
        justify-content: space-between;
        button {
          width: 48%;
          min-height: toRem(56px);
          box-sizing: border-box;
          border-radius: 8px;
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
}
</style>
