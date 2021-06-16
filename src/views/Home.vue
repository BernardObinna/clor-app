<template>
  <div class="home">
    <landing-header />
    <landing-send-money-section />
    <landing-how-it-works-section />
    <landing-reason-to-use-section />
    <landing-reason-to-use-section-mobile />
    <landing-f-a-q-section />
    <landing-vendor-section />
    <landing-footer />
  </div>
</template>

<script>
import landingSendMoneySection from '@/components/landingSendMoneySection'
import LandingHowItWorksSection from '@/components/landingHowItWorksSection'
import LandingReasonToUseSection from '@/components/landingReasonsToUseSection'
import LandingFAQSection from '@/components/landingFAQSection'
import LandingVendorSection from '../components/landingVendorSection'
import LandingHeader from '../components/landingHeader'
import LandingFooter from '../components/landingFooter'
import LandingReasonToUseSectionMobile from '../components/ReasonToUseMobile'

export default {
  name: 'Home',
  components: {
    LandingReasonToUseSectionMobile,
    LandingFooter,
    LandingHeader,
    LandingVendorSection,
    LandingFAQSection,
    LandingReasonToUseSection,
    LandingHowItWorksSection,
    landingSendMoneySection
  }
}
</script>

<!--<style lang="scss" scoped>-->
<!--@import 'src/assets/scss/core/mixins';-->
<!--@import 'src/assets/scss/core/variables';-->
<!--.home {-->
<!--  //  mobile-->
<!--  @include screen('med') {-->
<!--    margin-top: toRem(16px);-->
<!--  }-->

<!--  //  desktop-->
<!--  @include screen('x-large') {-->
<!--    margin-right: toRem(20px) !important;-->
<!--    margin-left: toRem(20px) !important;-->
<!--  }-->
<!--}-->
<!--</style>-->
