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
          class="btn btn-grey-outline px-2 opacity-3"
          :class="{ selected: usdcSelected }"
          @click="selectPaymentMethod('usdc')"
          disabled
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
          class="btn btn-grey-outline px-2 opacity-3"
          :class="{ selected: usdtSelected }"
          @click="selectPaymentMethod('usdt')"
          disabled
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

      <loader v-if="loading" classes="my-50" />

      <template v-else>
        <div class="limit-text">
          Send ${{ formatAmount }} in BTC with either the QR Code below or the
          Bitcoin address.
        </div>

        <div class="qr-code-block">
          <qrcode-vue
            :value="qrSpecs.value"
            level="H"
            :size="qrSpecs.size"
            renderAs="svg"
          ></qrcode-vue>
        </div>

        <div class="copy-code">
          <p>{{ btcAddress }}</p>

          <img
            class="pointer"
            src="@/assets/images/icons/copy-icon.svg"
            alt="Copy Icon"
            @click="copyAddress(btcAddress)"
          />
        </div>

        <div class="mt-32 text-lg-end">
          <button class="btn btn-primary-blue w-m-100" type="submit">
            I’ve sent it
          </button>
        </div>
      </template>
    </div>
  </form>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from '@vue/composition-api'
import UtilsService from '../../utils/UtilsService'
import QrcodeVue from 'qrcode.vue'
import Loader from '../../components/loader'

export default {
  name: 'SendMoneySelectCurrency',
  props: {
    details: Object
  },

  components: {
    Loader,
    QrcodeVue
  },

  setup(props, { root }) {
    const store = root.$store

    const data = reactive({
      form: {
        cryptoType: 'btc'
      },

      btcAddress: '',
      usdcAddress: '',
      usdtAddress: '',

      loading: true,

      qrSpecs: {
        value: 'https://example.com',
        size: 160
      }
    })

    //mounted
    onMounted(async () => {
      // if (props.details.paymentMethod) {
      data.loading = true
      data.form = { ...data.form, ...props.details }
      data.form.cryptoType = 'btc'

      let payload = {
        accountNo: props.details.accountNumber,
        bankName: props.details.bank,
        email: props.details.email,
        trackingId: props.details.trackingId
      }

      const [res] = await store.dispatch('sendMoney/getCryptoAddress', payload)
      if (!res) location.reload()
      else {
        data.qrSpecs.value = res.address
        data.btcAddress = res.address
        data.loading = false
      }

      // }
    })

    //methods
    const btcSelected = computed(() => {
      return data.form.cryptoType === 'btc'
    })

    const usdcSelected = computed(() => {
      return data.form.cryptoType === 'usdc'
    })

    const usdtSelected = computed(() => {
      return data.form.cryptoType === 'usdt'
    })

    function selectPaymentMethod(method) {
      data.form.cryptoType = method
    }

    const formatAmount = computed(() => {
      return UtilsService.formatAmount(props.details.amount)
    })

    function submit() {
      location.href = '/'
      // this.$emit('submit', data.form)
    }

    function copyAddress(newClip) {
      navigator.clipboard.writeText(newClip).then(
        function () {
          /* clipboard successfully set */
          root.$toast.success('Address copied')
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
      formatAmount,
      copyAddress,
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

      .btn {
        padding: toRem(12px) toRem(6px) toRem(12px) toRem(6px) !important;
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
    div > svg {
      width: toRem(160px);
      height: toRem(160px);
    }
    text-align: center;
    margin: toRem(24px) auto;
  }
}
</style>
