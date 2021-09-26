<template>
  <div class="bank-info-block">
    <div class="d-flex">
      <div class="muted-block">
        <p>Bank Name:</p>
        <p>Account Number:</p>
        <p>Account Email:</p>
      </div>
      <div class="strong-block">
        <p>
          {{ details.bank }}
        </p>
        <p>
          {{ details.accountNumber }}
        </p>
        <div class="d-flex justify-content-between">
          <p class="mt-0">
            {{ details.email }}
          </p>
          <p class="mt-0 ml-2 edit" @click="edit()">Edit</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SendMoneyBankInfo',
  props: ['details'],

  setup() {
    function edit() {
      this.$emit('edit')
    }

    return {
      edit
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

.bank-info-block {
  padding: toRem(20px) toRem(32px) toRem(6px);
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
    .edit {
      color: $color-primary;
      cursor: pointer;
    }
  }
}
</style>
