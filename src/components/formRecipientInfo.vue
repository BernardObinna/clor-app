<template>
  <form class="form-block" @submit.prevent="submit()">
    <!--recipient information-->
    <div id="recipient-information-block">
      <h5 class="mt-0">Recipient Information</h5>

      <div class="my-24">
        <label for="bank" class="form-label">Bank</label>
        <select
          class="form-select"
          aria-label="Select bank name"
          id="bank"
          v-model="form.bank"
        >
          <option value="" disabled selected>Select bank name</option>
          <option :value="bank.id" v-for="(bank, index) in banks" :key="index">
            {{ bank.name }}
          </option>
        </select>

        <span class="attention" v-if="v$.form.bank.$error"
          >Please select a bank</span
        >
      </div>

      <div class="my-24">
        <label for="account-number" class="form-label">Account number</label>
        <input
          type="text"
          class="form-control"
          id="account-number"
          aria-label="account number"
          placeholder="Enter account number"
          maxlength="11"
          @keydown="onlyNumbers"
          v-model="form.accountNumber"
        />
        <span
          class="attention"
          v-if="
            v$.form.accountNumber.$error &&
            v$.form.accountNumber.required.$invalid
          "
          >Please provide the recipient's account number</span
        >

        <span
          class="attention"
          v-if="
            v$.form.accountNumber.$error &&
            v$.form.accountNumber.numeric.$invalid
          "
          >Account number must be numeric</span
        >
      </div>

      <div class="">
        <label for="recipient-email" class="form-label">Recipient Email</label>
        <input
          type="email"
          class="form-control"
          id="recipient-email"
          aria-label="Recipient's email"
          placeholder="Enter email address"
          v-model="form.email"
        />
        <span
          class="attention"
          v-if="v$.form.email.$error && v$.form.email.required.$invalid"
          >Please provide the recipient's email</span
        >

        <span
          class="attention"
          v-if="v$.form.email.$error && v$.form.email.email.$invalid"
          >Please provide a valid email address</span
        >
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
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import useVuelidate from '@vuelidate/core'
import { required, email, numeric } from '@vuelidate/validators'
export default {
  name: 'FormRecipientInfo',
  props: {
    details: Object
  },
  setup(props) {
    //vuelidate rules
    const rules = {
      form: {
        bank: { required },
        accountNumber: { required, numeric },
        email: { required, email }
      }
    }

    const data = reactive({
      form: {
        bank: '',
        accountNumber: '',
        email: ''
      },

      banks: [
        { id: 'st', name: 'Sterling bank' },
        { id: 'gtb', name: 'GTBank' },
        { id: 'acs', name: 'Access Bank' }
      ]
    })

    onMounted(() => {
      if (props.details.bank) {
        data.form = props.details
      }
    })

    function submit() {
      v$.value.form.$touch()
      if (!v$.value.form.$invalid) this.$emit('submit', data.form)
    }

    const v$ = useVuelidate(rules, data)

    return {
      ...toRefs(data),
      v$,
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
  }
}
</style>
