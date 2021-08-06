<template>
  <div class="page">
    <app-header />

    <div class="app-body">
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

      <!--Payment details card view-->
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
          v-if="form.paymentMethod == 'crypto'"
        />

        <form-card-info v-if="form.paymentMethod == 'card'" />
      </template>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/appHeader'
import FormRecipientInfo from '../components/formRecipientInfo'
import { reactive, computed, toRefs, onMounted } from '@vue/composition-api'
import SendMoneyBankInfo from '../components/sendMoneyBankInfo'
import SendMoneyAmountAndMethod from '../components/sendMoneyAmountAndMethod'
import SendMoneySelectCryptoCurrency from '../components/sendMoneySelectCryptoCurrency'
import SendMoneyPaymentInfo from '../components/sendMoneyPaymentInfo'
import FormCardInfo from '../components/formCardInfo'
export default {
  setup(props, { root }) {
    const store = root.$store
    const data = reactive({
      // recipient: true,
      form: {
        bank: '',
        accountNumber: '',
        recipientEmail: '',
        amount: 0,
        paymentMethod: ''
      },

      step: 'inputRecipientInformation',
      showBankInfoBlock: false,
      showPaymentInfoBlock: false,
      showRecipientInfoForm: false,
      showAmountAndMethodForm: false,
      showCardOrCryptoForm: false
    })

    //mounted
    onMounted(async () => {
      await store.dispatch('sendMoney/getRates')
      if (root.$route.params.amount) {
        data.form.amount = root.$route.params.amount
      }

      // const [rates] = await store.dispatch('sendMoney/getRates')
      // if (rates)
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

    return {
      ...toRefs(data),
      displayRecipientInfoForm,
      displayAmountAndMethodForm,
      displayCardOrCryptoForm,
      goBackToStep,
      paymentMethodSelected,
      proceed
    }
  },
  name: 'SendMoney',
  components: {
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
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

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
