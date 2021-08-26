<template>
  <form class="form-block" @submit.prevent="submit()">
    <!--recipient information-->

    <loader v-if="gettingBanks" classes="my-24" />

    <div id="recipient-information-block" v-else>
      <h5 class="mt-0">Recipient Information</h5>

      <div class="my-24">
        <label for="bank" class="form-label">Bank</label>
        <!--<select-->
        <!--  class="form-select"-->
        <!--  aria-label="Select bank name"-->
        <!--  id="bank"-->
        <!--  v-model="form.bank"-->
        <!--  data-show-subtext="true"-->
        <!--  data-live-search="true"-->
        <!--&gt;-->
        <!--  <option value="" disabled selected data-tokens="name">-->
        <!--    Select bank name-->
        <!--  </option>-->
        <!--  <option value="" data-tokens="name">Select bank name</option>-->
        <!--  <option value="" data-tokens="name">bank</option>-->
        <!--  <option value="" data-tokens="name">breezyS</option>-->
        <!--  <option value="a" data-tokens="name">a</option>-->
        <!--  <option :value="bank.id" v-for="(bank, index) in banks" :key="index">-->
        <!--    {{ bank.name }}-->
        <!--  </option>-->
        <!--</select>-->

        <!--<div>-->
        <!--  <input-->
        <!--    class="form-control"-->
        <!--    list="datalistOptions"-->
        <!--    id="exampleDataList"-->
        <!--    placeholder="Type to search..."-->
        <!--  />-->
        <!--  <datalist id="datalistOptions" class="bg-white">-->
        <!--    <option value="San Francisco">san</option>-->
        <!--    <option value="New York">new</option>-->
        <!--    <option value="Seattle">aba</option>-->
        <!--    <option value="Los Angeles">preach</option>-->
        <!--  </datalist>-->
        <!--</div>-->

        <div>
          <dropdown-search
            :options="banks"
            :selected="form.bank"
            :onInput="
              (value) => {
                form.bank = value.name
                selectedBankCode = value.code
              }
            "
          />
        </div>

        <span class="attention" v-if="v$.form.bank.$error"
          >Please select a bank</span
        >
      </div>

      <div class="my-24" v-if="form.bank">
        <label for="account-number" class="form-label">Account number</label>
        <div class="d-flex position-relative">
          <input
            type="text"
            class="form-control"
            id="account-number"
            aria-label="account number"
            placeholder="Enter account number"
            maxlength="10"
            @keydown="onlyNumbers"
            v-model="form.accountNumber"
          />
          <div class="input-loader" v-if="nameEnquiry.loading">
            <loader />
          </div>
        </div>
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
            !v$.form.accountNumber.required.$invalid &&
            !nameEnquiry.loading &&
            !nameEnquiry.name
          "
          >Please provide a valid account number</span
        >

        <span
          class="attention"
          v-if="
            v$.form.accountNumber.$error &&
            v$.form.accountNumber.minLength.$invalid
          "
          >Account number must be 10 digits</span
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

      <div class="" v-if="nameEnquiry.name">
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

      <div class="name-resolution" v-if="nameEnquiry.name">
        <p>{{ nameEnquiry.name }}</p>
      </div>

      <div class="mt-24 text-lg-end">
        <button class="btn btn-primary-blue w-m-100" type="submit">
          Continue
        </button>
      </div>
    </div>

    <!--<div class="name-resolution">-->
    <!--  <p>Vayne Lucis</p>-->
    <!--</div>-->

    <!--<div class="mt-24 text-lg-end">-->
    <!--  <button class="btn btn-primary-blue w-m-100" type="submit">-->
    <!--    Continue-->
    <!--  </button>-->
    <!--</div>-->
  </form>
</template>

<script>
import {
  reactive,
  toRefs,
  onMounted,
  computed,
  watch
} from '@vue/composition-api'
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength } from '@vuelidate/validators'
import DropdownSearch from './dropdownSearch'
import Loader from './loader'
export default {
  name: 'FormRecipientInfo',
  components: { Loader, DropdownSearch },
  props: {
    details: Object
  },
  setup(props, { root }) {
    const store = root.$store
    //vuelidate rules
    const rules = {
      form: {
        bank: { required },
        accountNumber: { required, numeric, minLength: minLength(10) },
        email: { required, email }
      }
    }

    const data = reactive({
      form: {
        bank: '',
        accountNumber: '',
        email: ''
      },

      selectedBankCode: ''

      // banks: [
      //   { id: 'st', name: 'Sterling bank' },
      //   { id: 'gtb', name: 'GTBank' },
      //   { id: 'acs', name: 'Access Bank' }
      // ]
    })

    //mounted
    onMounted(() => {
      if (props.details.bank) {
        data.form = props.details
      }
    })

    //watcher
    watch(
      () => data.form.accountNumber,
      (value) => {
        if (value.length === 10) runNameEnquiry()
      }
    )

    //computed
    const gettingBanks = computed(
      () => store.getters['general/getBanks'].loading
    )
    const banks = computed(() => store.getters['general/getBanks'].banks)
    const nameEnquiry = computed(
      () => store.getters['sendMoney/getNameEnquiry']
    )

    //methods
    function runNameEnquiry() {
      data.form.email = ''
      let payload = {
        account_number: data.form.accountNumber,
        bank_code: data.selectedBankCode
      }
      store.dispatch('sendMoney/nameEnquiry', payload)
    }

    function submit() {
      v$.value.form.$touch()
      if (!v$.value.form.$invalid) this.$emit('submit', data.form)
    }

    const v$ = useVuelidate(rules, data)

    return {
      ...toRefs(data),
      v$,
      gettingBanks,
      banks,
      nameEnquiry,
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

  .name-resolution {
    display: flex;
    justify-content: space-between;
    background: rgba(81, 210, 48, 0.08);
    border: 1px solid rgba(81, 210, 48, 0.4);
    box-sizing: border-box;
    border-radius: 7px;
    padding: toRem(8px) toRem(16px);
    margin-top: toRem(24px);
    p {
      margin: 0;
      @include screen('med') {
        font-size: toRem(14px);
      }
    }
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
