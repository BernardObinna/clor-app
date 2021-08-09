<template>
  <div class="loader">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only d-none">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  setup() {
    // const store = root.$store
    // const baseMask = {
    //   decimal: '.',
    //   thousands: ',',
    //   prefix: 'R$ ',
    //   suffix: '',
    //   precision: 2,
    //   masked: false /* doesn't work with directive */
    // }
    //
    // const data = reactive({
    //   moneyReceive: {
    //     ...baseMask,
    //     prefix: '₦ '
    //   },
    //
    //   moneySend: {
    //     ...baseMask,
    //     prefix: '$ '
    //   },
    //   sendAmount: '',
    //   dollarRates: '',
    //   gettingRates: false
    // })
    //
    // //mounted
    // onMounted(async () => {
    //   data.gettingRates = true
    //   await store.dispatch('sendMoney/getRates')
    //   data.dollarRates = store.getters['sendMoney/getDollarRates']
    //   data.gettingRates = false
    // })
    //
    // //computed
    // const calculateNaira = computed(() => {
    //   return (
    //       data.dollarRates *
    //       Number(UtilsService.formatMoneyMask(data.sendAmount, true))
    //   )
    // })
    //
    // //methods
    // function submit() {
    //   this.$router.push({
    //     name: 'send-money',
    //     params: { amount: UtilsService.formatMoneyMask(data.sendAmount) }
    //   })
    // }
    //
    // return { ...toRefs(data), submit, calculateNaira }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  height: inherit;
  justify-content: center;
  display: flex;
  align-items: center;
  min-height: inherit;
}
</style>
