<template>
  <form class="form-block" @submit.prevent="submit()">
    <div id="payment-method-block">
      <h5 class="title">Select Currency</h5>

      <div class="payment-method">
        <button
          class="btn btn-grey-outline px-2"
          :class="{ selected: btcSelected }"
          @click="selectPaymentMethod('btc')"
          type="button"
        >
          <img
            class="d-block mx-auto mb-1"
            src="@/assets/images/icons/btc-icon.svg"
            alt="Fancy image"
          />
          Bitcoin
        </button>

        <button
          class="btn btn-grey-outline px-2"
          :class="{ selected: usdcSelected }"
          @click="selectPaymentMethod('usdc')"
          type="button"
        >
          <img
            class="d-block mx-auto mb-1"
            src="@/assets/images/icons/usdc-icon.svg"
            alt="Fancy image"
          />
          USDC
        </button>

        <button
          class="btn btn-grey-outline px-2"
          :class="{ selected: usdtSelected }"
          @click="selectPaymentMethod('usdt')"
          type="button"
        >
          <img
            class="d-block mx-auto mb-1"
            src="@/assets/images/icons/usdt-icon.svg"
            alt="Fancy image"
          />
          USDT
        </button>
      </div>

      <div class="limit-text">
        Send $1,000.00 in BTC with either the QR Code below or to the Bitcoin
        address.
      </div>

      <div class="qr-code-block">
        <img
          class=""
          src="@/assets/images/icons/qr-code-icon.svg"
          alt="Fancy image"
        />
      </div>

      <div class="copy-code">
        <p>1JzzKLHyL1EeR9T8DwmFkVupF7HHTx5t</p>

        <img
          class="pointer"
          src="@/assets/images/icons/copy-icon.svg"
          alt="Copy Icon"
          @click="copyAddress"
        />
      </div>

      <div class="mt-32 text-lg-end">
        <button class="btn btn-primary-blue w-m-100" type="submit">
          I’ve sent it
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/composition-api'

export default {
  name: 'SendMoneySelectCurrency',
  setup() {
    const data = reactive({
      form: {
        paymentMethod: ''
      }
    })

    const btcSelected = computed(() => {
      return data.form.paymentMethod === 'btc'
    })

    const usdcSelected = computed(() => {
      return data.form.paymentMethod === 'usdc'
    })

    const usdtSelected = computed(() => {
      return data.form.paymentMethod === 'usdt'
    })

    function selectPaymentMethod(method) {
      data.form.paymentMethod = method
    }

    function submit() {
      this.$emit('submit', data.form)
    }

    function copyAddress(newClip) {
      navigator.clipboard.writeText(newClip).then(
        function () {
          /* clipboard successfully set */
          // this.$toastr.s('SUCCESS MESSAGE', 'Success Toast Title')
        },
        function () {
          /* clipboard write failed */
        }
      )
    }

    return {
      ...toRefs(data),
      btcSelected,
      usdcSelected,
      usdtSelected,
      selectPaymentMethod,
      copyAddress,
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
  }

  .copy-code {
    display: flex;
    justify-content: space-between;
    background: rgba(65, 82, 252, 0.08);
    border: none;
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

    img {
      width: toRem(20px);
      height: toRem(20px);
    }
  }

  #payment-method-block {
    margin-bottom: toRem(16px);
    .payment-method {
      display: flex;
      justify-content: space-between;
      button {
        width: 32%;
        min-height: toRem(56px);
        box-sizing: border-box;
        border-radius: 8px !important;
        display: block;

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
  }

  .qr-code-block {
    img {
      width: toRem(160px);
      height: toRem(160px);
    }
    text-align: center;
    margin: toRem(24px) auto;
  }
}
</style>
