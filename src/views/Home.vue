<template>
  <div class="home">
    <landing-header />
    <landing-send-money-section />
    <landing-how-it-works-section />
    <landing-reason-to-use-section />
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
import LandingFooter from '../components/landingFooter';

export default {
  name: 'Home',
  components: {
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
