<template>
  <form class="form-block" @submit.prevent="submit()">
    <div id="payment-method-block" v-if="!loading">
      <h5 class="title">Amount and Method</h5>

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
            v-if="!cryptoSelected"
          />

          <img
            class="me-1"
            src="@/assets/images/icons/crypto-icon-black.svg"
            alt="Fancy image"
            v-else
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
            v-if="!cardSelected"
          />

          <img
            class="me-1"
            src="@/assets/images/icons/credit-card-icon-black.svg"
            alt="Fancy image"
            v-else
          />
          Card
        </button>
      </div>

      <div class="limit-text" v-if="!user">
        You can send between $10 and $2,500 at any given time. If you want to
        send more than this amount,
        <a href="javascript:" @click="openLoginModal"> Log in </a>
        or
        <a href="javascript:" @click="openSignUpModal"> Create an account </a>.
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

        <span
          class="attention"
          v-if="v$.form.amount.$error && v$.form.amount.notEmpty.$invalid"
          >Please specify an amount</span
        >
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
    <sender-details-modal @emitTrackingID="updateTrackingId($event)" />
  </form>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from '@vue/composition-api'
import UtilsService from '../../utils/UtilsService'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import SenderDetailsModal from '../../components/sendMoney/senderDetailsModal'

export default {
  name: 'SendMoneyAmountAndMethod',
  components: { SenderDetailsModal },
  props: {
    details: Object
  },
  setup(props, { root, emit }) {
    const store = root.$store

    //vuelidate rules
    const rules = {
      form: {
        amount: { notEmpty: (value) => value !== '$ 0.00' },
        paymentMethod: { required }
      }
    }

    const data = reactive({
      form: {
        amount: '$ 0.00',
        paymentMethod: 'card'
      },

      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      },

      loading: true
    })

    onMounted(() => {
      // if (props.details.paymentMethod) {
      if (props.details) {
        // console.log('the details', props.details.amount)
        // console.log('the details', typeof props.details.amount === 'string')
        data.form = {
          ...props.details,
          // amount:
          //   typeof props.details.amount === 'string'
          //     ? props.details.amount
          //     : props.details.amount,
          paymentMethod: 'card'
        }
      }

      data.loading = false
    })

    //computed
    const user = computed(() => {
      return store.getters['auth/getUserX']
    })

    const dollarRate = computed(() => {
      return store.getters['sendMoney/getDollarRates']
    })

    const amountToBeReceived = computed(() => {
      return UtilsService.formatAmount(
        dollarRate.value *
          Number(UtilsService.formatMoneyMask(data.form.amount))
      )
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

    const saveCurrentDetailsInLocalStorage = () => {
      localStorage.setItem('temp_details', JSON.stringify(data.form))
    }

    const openLoginModal = () => {
      saveCurrentDetailsInLocalStorage()
      store.dispatch('general/openModal', {
        id: 'loginModal'
      })
    }

    const openSignUpModal = () => {
      saveCurrentDetailsInLocalStorage()
      store.dispatch('general/openModal', {
        id: 'signUpModal'
      })
    }

    const updateTrackingId = (trackingId) => {
      data.form.trackingId = trackingId
      submit()
    }

    function selectPaymentMethod(method) {
      data.form.paymentMethod = method
    }

    function submit() {
      // data.form.paymentMethod = 'card'
      v$.value.form.$touch()
      if (!v$.value.form.$invalid) {
        // show the sender details modal if logged out to get the tracking id
        if (!user.value && !data.form.trackingId) {
          store.dispatch('general/openModal', {
            id: 'senderDetailsModal'
          })
          return
        }
        const payload = {
          amount: Number.parseFloat(
            UtilsService.formatMoneyMask(data.form.amount)
          ).toFixed(2),
          paymentMethod: data.form.paymentMethod,
          trackingId: data.form.trackingId
        }
        emit('submit', payload)
      }
    }

    const v$ = useVuelidate(rules, data)

    return {
      ...toRefs(data),
      v$,
      user,
      amountToBeReceived,
      showBankInfoBlock,
      dollarRate,
      cardSelected,
      cryptoSelected,
      updateTrackingId,
      selectPaymentMethod,
      openLoginModal,
      openSignUpModal,
      submit
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

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
