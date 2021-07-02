<template>
  <div class="payment-info-block">
    <div class="d-flex">
      <div class="muted-block">
        <p>Payment method:</p>
        <p>Amount:</p>
      </div>
      <div class="strong-block">
        <p v-if="details.paymentMethod == 'crypto'">
          <img
            class="me-1"
            src="@/assets/images/icons/crypto-icon-black.svg"
            alt="Crypto icon"
          />
          Crypto
        </p>

        <p v-if="details.paymentMethod == 'card'">
          <img
            class="me-1"
            src="@/assets/images/icons/credit-card-icon-black.svg"
            alt="Crypto icon"
          />
          Card
        </p>

        <div class="d-flex justify-content-between">
          <p class="mt-0">${{ details.amount }}</p>
          <p class="mt-0 ml-2 edit" @click="edit()">Edit</p>
        </div>
      </div>
    </div>

    <div class="converted-amount">
      <p>NGN {{ details.amount }}</p>

      <p>1 USD = {{ dollarRate }} NGN</p>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'

export default {
  name: 'SendMoneyPaymentInfo',
  props: {
    details: Object
  },

  setup() {
    const data = reactive({
      dollarRate: 478
    })
    function edit() {
      this.$emit('edit')
    }

    return {
      ...toRefs(data),
      edit
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/core/mixins';
@import 'src/assets/scss/core/variables';

.payment-info-block {
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

  p {
    font-size: toRem(14px);
  }

  .muted-block p {
    color: $color-muted-grey !important;
    white-space: nowrap;
  }

  .strong-block {
    margin-left: toRem(26px);
    width: 100%;
    img {
      width: toRem(24px);
      height: toRem(24px);
    }
    .edit {
      color: $color-primary;
      cursor: pointer;
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
    p {
      margin: 0;
      @include screen('med') {
        font-size: toRem(14px);
      }
    }
  }
}
</style>
