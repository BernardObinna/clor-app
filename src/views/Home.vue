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

    <login-modal />
    <sign-up-modal />
    <forgot-password-modal />
    <reset-password-modal />
  </div>
</template>

<script>
import landingSendMoneySection from '@/components/landingPage/landingSendMoneySection'
import LandingHowItWorksSection from '@/components/landingPage/landingHowItWorksSection'
import LandingReasonToUseSection from '@/components/landingPage/landingReasonsToUseSection'
import LandingFAQSection from '@/components/landingPage/landingFAQSection'
import LandingVendorSection from '../components/landingPage/landingVendorSection'
import LandingHeader from '../components/landingPage/landingHeader'
import LandingFooter from '../components/landingPage/landingFooter'
import LandingReasonToUseSectionMobile from '../components/landingPage/ReasonToUseMobile'
import LoginModal from '../components/auth/loginModal'
import SignUpModal from '../components/auth/signUpModal'
import ForgotPasswordModal from '../components/auth/forgotPasswordModal'

import { onMounted } from '@vue/composition-api'
import ResetPasswordModal from '../components/auth/resetPasswordModal'

export default {
  name: 'Home',
  components: {
    ResetPasswordModal,
    ForgotPasswordModal,
    SignUpModal,
    LoginModal,
    LandingReasonToUseSectionMobile,
    LandingFooter,
    LandingHeader,
    LandingVendorSection,
    LandingFAQSection,
    LandingReasonToUseSection,
    LandingHowItWorksSection,
    landingSendMoneySection
  },

  setup(props, { root }) {
    const store = root.$store

    //mounted
    onMounted(async () => {
      if (!root.$route.query.token) openResetPasswordModal()
    })
    const openResetPasswordModal = () => {
      store.dispatch('general/openModal', {
        id: 'resetPasswordModal'
      })
    }
  }
}
</script>
