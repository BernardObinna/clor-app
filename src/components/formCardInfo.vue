<template>
  <form class="form-block" @submit.prevent="submit()">
    <!--recipient information-->
    <div id="recipient-information-block">
      <h5 class="mt-0">Enter Card Information</h5>

      <div class="my-28">
        <label for="send-money-card-number" class="form-label"
          >Card number</label
        >
        <div class="input-group send-input">
          <input
            type="text"
            class="form-control border-end-0"
            id="send-money-card-number"
            autocomplete="false"
            placeholder="4299   4100   6183  8742"
            aria-label="Debit card number"
            v-model="form.cardNumber"
          />
          <span class="input-group-text" id="send-money-sending-currency-flag">
            <img
              class="me-1"
              src="@/assets/images/logos/visa-card-logo.svg"
              alt="card company"
          /></span>
        </div>
      </div>

      <div class="my-28 row">
        <div class="col-6">
          <label for="card-expiry-date" class="form-label">Expiry Date</label>
          <input
            type="text"
            class="form-control"
            id="card-expiry-date"
            aria-label="card expiry date"
            placeholder="01/24"
            v-model="form.expiryDate"
            required
          />
        </div>

        <div class="col-6">
          <label for="card-cvc" class="form-label">CVC</label>
          <input
            type="text"
            class="form-control"
            id="card-cvc"
            aria-label="Card CVC"
            placeholder="911"
            v-model="form.cvc"
            required
          />
        </div>
      </div>
    </div>

    <div class="summary-text">
      <span>Summary</span>
      <div class="d-flex justify-content-between">
        <p>You Send</p>
        <p>$ 1,000.00</p>
      </div>

      <div class="d-flex justify-content-between">
        <p>Processing fee</p>
        <p>$ 10.00</p>
      </div>

      <div class="d-flex justify-content-between">
        <p class="mb-0">Total</p>
        <p class="mb-0">$ 1,010.00</p>
      </div>

      <div class="divider"></div>

      <div class="d-flex justify-content-between">
        <p class="mb-0">Recipient gets</p>
        <p class="mb-0">$ 1,010.00</p>
      </div>
    </div>

    <div class="mt-24 text-lg-end">
      <button class="btn btn-primary-blue w-m-100" type="submit">
        Continue
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  name: 'FormCardInfo',
  setup() {
    const data = reactive({
      form: {
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      }
    })

    function submit() {
      this.$emit('submit', data.form)
    }

    return {
      ...toRefs(data),
      submit
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.form-block {
  padding: toRem(20px) toRem(32px) toRem(20px);
  background: white;
  border: 1px solid rgba(206, 208, 213, 0.4);
  box-sizing: border-box;
  max-width: toRem(456px);

  @include screen('med') {
    border: none;
    padding-top: toRem(20px);
  }
  @include screen('large') {
    border-radius: 8px;
    margin: toRem(60px) auto 0;
  }

  p,
  h5 {
    color: $color-dark-blue;
    font-family: 'Circular', sans-serif !important;

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
      height: 1rem;
    }
  }

  .summary-text {
    text-align: center;
    margin-top: toRem(16px);
    background: rgba(206, 208, 213, 0.08);
    border: 1px solid rgba(206, 208, 213, 0.24);
    box-sizing: border-box;
    border-radius: 8px;
    padding: toRem(16px);

    .divider {
      border: 1px solid rgba(206, 208, 213, 0.24);
      border-radius: 8px;
      width: 100%;
      margin: toRem(8px) 0;
    }
  }
}
</style>
