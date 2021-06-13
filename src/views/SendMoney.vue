<template>
  <div class="page">
    <app-header />

    <div class="app-body">
      <h4 class="title">Send money</h4>
      <form class="form-block">
        <h5>Recipient Information</h5>
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
          <label for="account-number" class="form-label">Account number</label>
          <input
            type="text"
            class="form-control"
            id="account-number"
            aria-describedby="account number"
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
            aria-describedby="Recipient's email"
            placeholder="Enter email address"
            v-model="form.recipientEmail"
          />
        </div>

        <div class="mt-24">
          <button class="btn btn-primary-blue w-m-100">Continue</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/appHeader'
import { reactive } from '@vue/composition-api'
export default {
  setup() {
    const data = reactive({
      form: {
        bank: '',
        accountNumber: '',
        recipientEmail: ''
      },

      banks: [
        { id: 'st', name: 'Sterling bank' },
        { id: 'gtb', name: 'GTBank' },
        { id: 'acs', name: 'Access Bank' }
      ]
    })

    return { ...data }
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
  }
}
</style>
