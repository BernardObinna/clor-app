<template>
  <div class="page">
    <app-header />

    <div class="app-body">
      <loader v-if="showLoader" />
      <!--form body-->
      <div v-else>
        <!--bank details card view-->
        <send-money-bank-info
          :details="form"
          @edit="goBackToStep('inputRecipientInformation')"
          v-if="showBankInfoBlock"
        />

        <!--recipient information-->

        <form-recipient-info
          :details="form"
          @submit="proceed($event, 'amountAndMethod')"
          v-if="displayRecipientInfoForm"
        />

        <!--Payment details card summary view-->
        <div
          class="dropdown-divider d-lg-none my-4"
          v-if="showPaymentInfoBlock || displayAmountAndMethodForm"
        ></div>

        <send-money-payment-info
          :details="form"
          @edit="goBackToStep('amountAndMethod')"
          v-if="showPaymentInfoBlock"
        />

        <!--Amount and method-->
        <send-money-amount-and-method
          :details="form"
          @submit="proceed($event, 'card-crypto-step')"
          v-if="displayAmountAndMethodForm"
        />

        <!--  Select Crypto Currency -->
        <template v-if="displayCardOrCryptoForm">
          <div class="dropdown-divider d-lg-none my-4"></div>
          <send-money-select-crypto-currency
            :details="form"
            v-if="form.paymentMethod == 'crypto'"
          />

          <form-card-info
            :details="form"
            @submit="submit($event)"
            v-if="form.paymentMethod == 'card'"
          />
        </template>
      </div>
    </div>

    <sign-up-modal />
    <login-modal />
  </div>
</template>

<script>
import AppHeader from './sendMoneyHeader'
import FormRecipientInfo from './formRecipientInfo'
import { reactive, computed, toRefs, onMounted } from '@vue/composition-api'
import SendMoneyBankInfo from './sendMoneyBankInfo'
import SendMoneyAmountAndMethod from './sendMoneyAmountAndMethod'
import SendMoneySelectCryptoCurrency from './sendMoneySelectCryptoCurrency'
import SendMoneyPaymentInfo from './sendMoneyPaymentInfo'
import FormCardInfo from './formCardInfo'
import Loader from '../../components/loader'
import SignUpModal from '../../components/auth/signUpModal'
import LoginModal from '../../components/auth/loginModal'
export default {
  setup(props, { root }) {
    const store = root.$store
    const data = reactive({
      // recipient: true,
      form: {
        bank: '',
        accountNumber: '',
        email: '',
        amount: 0,
        paymentMethod: ''
      },

      step: 'inputRecipientInformation',
      showBankInfoBlock: false,
      showPaymentInfoBlock: false,
      showRecipientInfoForm: false,
      showAmountAndMethodForm: false,
      showCardOrCryptoForm: false,
      loading: false,
      submitting: false
    })

    //mounted
    onMounted(async () => {
      data.loading = true
      //generate the tracking ID for crypto transactions if logged in at this point.
      if (store.getters['auth/getUserX']) {
        const [res] = await store.dispatch('sendMoney/initTransaction')

        if (res) {
          data.form = { ...data.form, trackingId: res.trackingId }
        }
      }
      await Promise.all([
        store.dispatch('sendMoney/getRates'),
        store.dispatch('general/getBanks')
      ])
      if (root.$route.params.amount) {
        data.form.amount = root.$route.params.amount
      }

      const tempDetails = JSON.parse(localStorage.getItem('temp_details'))
      if (tempDetails) {
        data.form = tempDetails
        localStorage.removeItem('temp_details')
      }

      // const [rates] = await store.dispatch('sendMoney/getRates')
      // if (rates)

      data.loading = false
    })

    const displayRecipientInfoForm = computed(() => {
      return (
        data.showRecipientInfoForm || data.step === 'inputRecipientInformation'
      )
    })

    const displayAmountAndMethodForm = computed(() => {
      return (
        (data.showAmountAndMethodForm || data.step === 'amountAndMethod') &&
        !data.showPaymentInfoBlock
      )
    })

    const displayCardOrCryptoForm = computed(() => {
      return data.showCardOrCryptoForm || data.step === 'card-crypto-step'
    })

    const paymentMethodSelected = computed(() => {
      return !!data.form.paymentMethod
    })

    function goBackToStep(step) {
      switch (step) {
        case 'inputRecipientInformation': {
          data.showBankInfoBlock = false
          data.showRecipientInfoForm = true
          break
        }
        case 'amountAndMethod': {
          data.showPaymentInfoBlock = false
          data.showAmountAndMethodForm = true
        }
      }

      data.step = step ? step : 'inputRecipientInformation'
    }

    function proceed(info, nextStep) {
      data.form = { ...data.form, ...info }
      switch (nextStep) {
        case 'amountAndMethod': {
          data.showBankInfoBlock = true
          data.showRecipientInfoForm = false
          break
        }
        case 'card-crypto-step': {
          data.showPaymentInfoBlock = true
          data.showAmountAndMethodForm = false
          data.showCardOrCryptoForm = true
        }
      }
      data.step = nextStep
    }

    const showLoader = computed(() => {
      return data.submitting || data.loading
    })

    const submit = async (info) => {
      data.form = { ...data.form, ...info }

      let splitDate = data.form.expiryDate.split('/')
      let month = Number(splitDate[0])
      let year = Number(splitDate[1])

      let payload = {
        amount: data.form.amount,
        expMonth: month,
        expYear: year,
        cardDetails: {
          number: data.form.cardNumber,
          cvv: data.form.cvc
        },
        billingDetails: {
          line1: data.form.address1,
          line2: data.form.address2,
          city: data.form.city,
          district: data.form.district,
          postalCode: data.form.postalCode,
          country: data.form.country,
          name: data.form.address1
        },
        metadata: {
          phoneNumber: '+2347018782712',
          email: data.form.email
        },
        description: 'From Clorza',
        recipient: {
          accountNumber: data.form.accountNumber,
          bank: data.form.bank,
          email: data.form.email
        }
      }

      data.submitting = true
      await store.dispatch('sendMoney/sendDollarToNaira', payload)
      data.submitting = false
    }

    return {
      ...toRefs(data),
      displayRecipientInfoForm,
      displayAmountAndMethodForm,
      displayCardOrCryptoForm,
      paymentMethodSelected,
      showLoader,
      goBackToStep,
      submit,
      proceed
    }
  },
  name: 'SendMoney',
  components: {
    LoginModal,
    SignUpModal,
    Loader,
    FormCardInfo,
    SendMoneyPaymentInfo,
    SendMoneySelectCryptoCurrency,
    SendMoneyAmountAndMethod,
    SendMoneyBankInfo,
    AppHeader,
    FormRecipientInfo
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

.page {
  background: $color-faded-cyan;
  @include screen('med') {
    background: white;
  }
  min-height: 100vh;
}

.app-body {
  padding-bottom: 3.4rem;
  p,
  h5 {
    color: $color-dark-blue;
  }
  border-radius: 16px;
  min-height: 91vh;

  .title {
    text-align: center;
    padding-top: toRem(80px);
    margin-top: 0;
    @include screen('med') {
      padding-top: toRem(40px);
    }
  }
}
</style>
