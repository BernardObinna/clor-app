<template>
  <div class="page">
    <app-header />

    <div class="app-body">
      <!--bank details view-->
      <send-money-bank-info
        :details="form"
        @edit="goBackToRecipientInfo()"
        v-if="showBankInfoBlock"
      />
      <!--Payment details view-->
      <send-money-payment-info :details="form" v-if="form.paymentMethod" />

      <!--recipient information-->
      <form-recipient-info
        @submit="proceed($event, 'amountAndMethod')"
        v-if="step == 'recipientInformation'"
      />

      <!--Amount and method-->
      <send-money-amount-and-method
        @submit="proceed($event, 'selectCurrency')"
        v-if="step == 'amountAndMethod'"
      />

      <!--  Select Currency -->
      <send-money-select-crypto-currency
        v-if="step == 'selectCurrency' && form.paymentMethod == 'crypto'"
      />
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

      step: 'recipientInformation'
    })

    const showBankInfoBlock = computed(() => {
      return (
        data.form.bank &&
        data.form.accountNumber &&
        data.form.recipientEmail &&
        data.step !== 'recipientInformation'
      )
    })

    const paymentMethodSelected = computed(() => {
      return !!data.form.paymentMethod
    })

    function goBackToRecipientInfo() {
      data.step = 'recipientInformation'
    }

    function proceed(info, nextStep) {
      data.form = { ...data.form, ...info }
      data.step = nextStep
    }

    return {
      ...toRefs(data),
      showBankInfoBlock,
      goBackToRecipientInfo,
      paymentMethodSelected,
      proceed
    }
  },
  name: 'SendMoney',
  components: {
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
