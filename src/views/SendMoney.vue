<template>
  <div class="page">
    <app-header />

    <div class="app-body">
      <!--bank details card view-->
      <send-money-bank-info
        :details="form"
        @edit="goBackToStep()"
        v-if="showBankInfoBlock"
      />
      <!--Payment details card view-->
      <send-money-payment-info
        :details="form"
        @edit="goBackToStep('amountAndMethod')"
        v-if="form.paymentMethod"
      />

      <!--Forms-->
      <!--recipient information-->
      <form-recipient-info
        @submit="proceed($event, 'amountAndMethod')"
        v-if="step == 'inputRecipientInformation'"
      />

      <!--Amount and method-->
      <send-money-amount-and-method
        @submit="proceed($event, 'step-3')"
        v-if="step == 'amountAndMethod'"
      />

      <!--  Select Crypto Currency -->
      <send-money-select-crypto-currency
        v-if="step == 'step-3' && form.paymentMethod == 'crypto'"
      />

      <form-card-info v-if="step == 'step-3' && form.paymentMethod == 'card'" />
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/appHeader'
import FormRecipientInfo from '../components/formRecipientInfo'
import { reactive, computed, toRefs } from '@vue/composition-api'
import SendMoneyBankInfo from '../components/sendMoneyBankInfo'
import SendMoneyAmountAndMethod from '../components/sendMoneyAmountAndMethod'
import SendMoneySelectCryptoCurrency from '../components/sendMoneySelectCryptoCurrency'
import SendMoneyPaymentInfo from '../components/sendMoneyPaymentInfo'
import FormCardInfo from '../components/formCardInfo'
export default {
  setup() {
    const data = reactive({
      // recipient: true,
      form: {
        bank: '',
        accountNumber: '',
        recipientEmail: '',
        amount: 0,
        paymentMethod: ''
      },

      step: 'inputRecipientInformation'
    })

    const showBankInfoBlock = computed(() => {
      return (
        data.form.bank &&
        data.form.accountNumber &&
        data.form.recipientEmail &&
        data.step !== 'inputRecipientInformation'
      )
    })

    const paymentMethodSelected = computed(() => {
      return !!data.form.paymentMethod
    })

    function goBackToStep(step) {
      data.step = step ? step : 'inputRecipientInformation'
    }

    function proceed(info, nextStep) {
      data.form = { ...data.form, ...info }
      data.step = nextStep
    }

    return {
      ...toRefs(data),
      showBankInfoBlock,
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
