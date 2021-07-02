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
          required
        >
          <option value="" disabled selected>Select bank name</option>
          <option :value="bank.id" v-for="(bank, index) in banks" :key="index">
            {{ bank.name }}
          </option>
        </select>
      </div>

      <div class="my-24">
        <label for="account-number" class="form-label">Account number</label>
        <input
          type="text"
          class="form-control"
          id="account-number"
          aria-label="account number"
          placeholder="Enter account number"
          v-model="form.accountNumber"
          required
        />
      </div>

      <div class="">
        <label for="recipient-email" class="form-label">Recipient Email</label>
        <input
          type="email"
          class="form-control"
          id="recipient-email"
          aria-label="Recipient's email"
          placeholder="Enter email address"
          v-model="form.recipientEmail"
          required
        />
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
export default {
  name: 'FormRecipientInfo',
  props: {
    details: Object
  },
  setup(props) {
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

    onMounted(() => {
      if (props.details.bank) {
        data.form = props.details
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
  }
}
</style>
