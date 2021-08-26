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
          <!--<input-->
          <!--  type="text"-->
          <!--  class="form-control border-end-0"-->
          <!--  id="send-money-card-number"-->
          <!--  autocomplete="false"-->
          <!--  placeholder="4299   4100   6183  8742"-->
          <!--  aria-label="Debit card number"-->
          <!--  @change="formatStringMask(form.cardNumber)"-->
          <!--  v-model="form.cardNumber"-->
          <!--/>-->
          <!--v-mask="maskString"-->

          <the-mask
            class="form-control border-end-0"
            v-model="form.cardNumber"
            aria-label="Debit card number"
            :mask="cardMask"
            id="send-money-card-number"
            autocomplete="false"
            raw="true"
            type="tel"
            placeholder="4299   4100   6183  8742"
          ></the-mask>

          <span class="input-group-text" id="send-money-sending-currency-flag">
            <img
              class="me-1"
              src="@/assets/images/logos/visa-card-logo.svg"
              alt="card company"
          /></span>
        </div>
        <span
          class="attention"
          v-if="
            v$.form.cardNumber.$error && v$.form.cardNumber.required.$invalid
          "
          >Please provide your card number</span
        >
      </div>

      <div class="my-28 row">
        <div class="col-6">
          <label for="card-expiry-date" class="form-label">Expiry Date</label>
          <!--<input-->
          <!--  type="text"-->
          <!--  class="form-control"-->
          <!--  id="card-expiry-date"-->
          <!--  aria-label="card expiry date"-->
          <!--  placeholder="01/24"-->
          <!--  v-model="form.expiryDate"-->
          <!--  required-->
          <!--/>-->

          <the-mask
            class="form-control"
            v-model="form.expiryDate"
            aria-label="card expiry date"
            :mask="dateMask"
            id="card-expiry-date"
            raw="true"
            type="tel"
            placeholder="01/24"
          ></the-mask>

          <span
            class="attention"
            v-if="
              v$.form.expiryDate.$error && v$.form.expiryDate.required.$invalid
            "
            >Please provide the card's expiry date</span
          >
        </div>

        <div class="col-6">
          <label for="card-cvc" class="form-label">CVC</label>
          <!--<input-->
          <!--  type="text"-->
          <!--  class="form-control"-->
          <!--  id="card-cvc"-->
          <!--  aria-label="Card CVC"-->
          <!--  placeholder="911"-->
          <!--  v-model="form.cvc"-->
          <!--  required-->
          <!--/>-->

          <the-mask
            class="form-control"
            v-model="form.cvc"
            aria-label="Card CVC"
            :mask="cvvMask"
            id="card-cvc"
            raw="true"
            type="tel"
            placeholder="911"
          ></the-mask>

          <span
            class="attention"
            v-if="v$.form.cvc.$error && v$.form.cvc.required.$invalid"
            >Please provide the card's cvc</span
          >
        </div>
      </div>

      <!--billing information-->
      <h5 class="mt-0">Billing Information</h5>

      <div class="my-28">
        <label for="address-line-1" class="form-label">Line 1</label>

        <input
          type="text"
          class="form-control"
          id="address-line-1"
          placeholder="Address 1"
          aria-label="Address line 1"
          v-model="form.address1"
        />

        <span
          class="attention"
          v-if="v$.form.address1.$error && v$.form.address1.required.$invalid"
          >Please provide at least 1 address</span
        >
      </div>

      <div class="my-28">
        <label for="address-line-1" class="form-label">Line 2</label>

        <input
          type="text"
          class="form-control"
          id="address-line-2"
          placeholder="Address 2"
          aria-label="Address line 2"
          v-model="form.address2"
        />
      </div>

      <div class="my-28 row">
        <div class="col-6">
          <label for="address-country" class="form-label">Country</label>
          <input
            type="text"
            class="form-control"
            id="address-country"
            aria-label="country"
            placeholder="USA"
            v-model="form.country"
          />

          <span
            class="attention"
            v-if="v$.form.country.$error && v$.form.country.required.$invalid"
            >Please provide the billing country</span
          >
        </div>

        <div class="col-6">
          <label for="address-city" class="form-label">City</label>
          <input
            type="text"
            class="form-control"
            id="address-city"
            aria-label="City"
            placeholder="San fransisco"
            v-model="form.city"
          />
          <span
            class="attention"
            v-if="v$.form.city.$error && v$.form.city.required.$invalid"
            >Please provide your city</span
          >
        </div>
      </div>

      <div class="my-28 row">
        <div class="col-6">
          <label for="address-district" class="form-label">District</label>
          <input
            type="text"
            class="form-control"
            id="address-district"
            aria-label="District"
            placeholder="Mission District"
            v-model="form.district"
          />
          <span
            class="attention"
            v-if="v$.form.district.$error && v$.form.district.required.$invalid"
            >Please provide your district</span
          >
        </div>

        <div class="col-6">
          <label for="address-postal-code" class="form-label"
            >Postal Code</label
          >
          <input
            type="text"
            class="form-control"
            id="address-postal-code"
            aria-label="Postal-code"
            placeholder="98105"
            @keydown="onlyNumbers"
            v-model="form.postalCode"
          />

          <span
            class="attention"
            v-if="
              v$.form.postalCode.$error && v$.form.postalCode.required.$invalid
            "
            >Please provide your district</span
          >

          <span
            class="attention"
            v-if="
              v$.form.postalCode.$error && v$.form.postalCode.numeric.$invalid
            "
            >Postal code number must be numeric</span
          >
        </div>
      </div>
    </div>

    <div class="summary-text">
      <span>Summary</span>
      <div class="d-flex justify-content-between">
        <p>You Send</p>
        <p>$ {{ sendingAmount }}</p>
      </div>

      <div class="d-flex justify-content-between">
        <p>Processing fee</p>
        <p>$ 10.00</p>
      </div>

      <div class="d-flex justify-content-between">
        <p class="mb-0">Total</p>
        <p class="mb-0">$ {{ total }}</p>
      </div>

      <div class="divider"></div>

      <div class="d-flex justify-content-between">
        <p class="mb-0">Recipient gets</p>
        <p class="mb-0">₦ {{ recipientAmount }}</p>
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
import { computed, onMounted, reactive, toRefs } from '@vue/composition-api'
import { TheMask } from 'vue-the-mask'
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import UtilsService from '../utils/UtilsService'

export default {
  name: 'FormCardInfo',
  props: {
    details: Object
  },
  components: { TheMask },
  setup(props, { root }) {
    const store = root.$store

    //vuelidate rules
    const rules = {
      form: {
        cardNumber: { required },
        expiryDate: { required },
        cvc: { required },
        address1: { required },
        country: { required },
        city: { required },
        district: { required },
        postalCode: { required, numeric }
      }
    }

    const data = reactive({
      form: {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        address1: '',
        address2: '',
        country: '',
        city: '',
        district: '',
        postalCode: ''
      },
      details: props.details,
      processingFee: 10
    })

    onMounted(() => {
      // if (props.details.paymentMethod) {
      data.form = props.details
      // }
    })

    function formatStringMask(str, delimiter = '-') {
      return UtilsService.formatStringMask(str, delimiter)
    }

    const sendingAmount = computed(() => {
      return UtilsService.formatAmount(Number(props.details.amount))
    })

    const total = computed(() => {
      return UtilsService.formatAmount(
        data.processingFee + Number(props.details.amount)
      )
    })

    const recipientAmount = computed(() => {
      return UtilsService.formatAmount(
        (data.processingFee + Number(props.details.amount)) *
          store.getters['sendMoney/getDollarRates']
      )
    })

    function submit() {
      v$.value.form.$touch()
      if (!v$.value.form.$invalid) this.$emit('submit', data.form)
    }

    // const maskString = ['####-####-####-####', '####-####-####-####-###']
    const cardMask = ['#### #### #### ####', '#### #### #### #### ###']
    const dateMask = ['#/##', '##/##']
    const cvvMask = '###'
    const v$ = useVuelidate(rules, data)

    return {
      ...toRefs(data),
      total,
      recipientAmount,
      sendingAmount,
      cardMask,
      dateMask,
      cvvMask,
      v$,
      formatStringMask,
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
