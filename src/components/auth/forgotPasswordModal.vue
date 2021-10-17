<template>
  <div>
    <modal
      modal-id="forgotPasswordModal"
      modal-title-id="forgotPasswordModalTitle"
      modal-title="Reset Password"
      @closeModal="clearData"
    >
      <template v-slot:modalBody>
        <template v-if="!successView">
          <p class="mt-8">
            Enter your email address. A password reset link will be sent to your
            email
          </p>
          <form class="form-block">
            <div class="mt-31 mb-16">
              <input
                type="text"
                class="form-control"
                id="forgot-password-email"
                placeholder="Email address"
                aria-label="Email address"
                v-model="form.email"
              />

              <span
                class="attention"
                v-if="v$.form.email.$error && v$.form.email.required.$invalid"
                >Email is required</span
              >

              <span
                class="attention"
                v-if="v$.form.email.$error && v$.form.email.email.$invalid"
                >Please provide a valid email</span
              >
            </div>

            <p class="no-account-text">
              Don't have an account?
              <span class="text-primary pointer" @click="openSignUpModal"
                >Sign up</span
              >
            </p>
          </form>
        </template>

        <template v-else>
          <P class="my-32 text-center"
            >Please check your email for a reset link</P
          >
        </template>
      </template>
      <template v-slot:modalFooter>
        <div class="text-center my-32">
          <button
            v-if="!successView"
            type="button"
            class="btn btn-primary mx-auto"
            :disabled="loading"
            @click="submit"
          >
            {{ loading ? 'Processing' : 'Continue' }}
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Modal from '../modal'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
// import UtilsService from '../../utils/UtilsService'
export default {
  name: 'ForgotPasswordModal',
  components: { Modal },
  setup(props, { root }) {
    const store = root.$store

    //
    //vuelidate rules
    const rules = {
      form: {
        email: { required, email }
      }
    }

    const data = reactive({
      form: {
        email: ''
      },

      successView: false,
      loading: false
    })

    const v$ = useVuelidate(rules, data)

    const openChangePasswordModal = () => {
      clearData()
      store.dispatch('general/openModal', {
        id: 'changePasswordModal'
      })
    }

    const openSignUpModal = () => {
      clearData()
      store.dispatch('general/openModal', {
        id: 'signUpModal'
      })
    }

    const clearData = () => {
      data.form = {
        email: ''
      }
      !v$.value.form.$reset()
    }

    const submit = async () => {
      v$.value.form.$touch()
      if (!v$.value.form.$invalid) {
        data.loading = true
        const res = await store.dispatch('auth/forgotPassword', data.form)
        if (res) data.successView = true
        data.loading = false
      }
    }

    return {
      ...toRefs(data),
      v$,
      clearData,
      openChangePasswordModal,
      openSignUpModal,
      submit
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/core/mixins';
@import '../../assets/scss/core/variables';

.forgot-password-text {
  font-family: 'Circular', sans-serif !important;
  font-style: normal;
  font-weight: normal;
  font-size: toRem(14px);
  line-height: toRem(20px);
  margin-bottom: toRem(8px);
  display: inline-block;
  color: $color-primary;
}

.no-account-text {
  font-family: 'Circular', sans-serif !important;
  font-style: normal;
  font-weight: normal;
  font-size: toRem(14px);
  line-height: toRem(20px);
  text-align: center;
  color: $color-dark-blue;
  margin-bottom: 0;
}
</style>
