<template>
  <div>
    <modal
      modal-id="loginModal"
      modal-title-id="loginModalTitle"
      modal-title="Login"
      @closeModal="clearData"
    >
      <template v-slot:modalBody>
        <form class="form-block">
          <div class="mt-31 mb-40">
            <input
              type="text"
              class="form-control"
              id="email"
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

          <div class="mb-16 text-end">
            <span class="forgot-password-text" @click="openForgotPasswordModal">
              Forgot Password ?
            </span>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              aria-label="password"
              v-model="form.password"
            />

            <span
              class="attention text-start"
              v-if="
                v$.form.password.$error && v$.form.password.required.$invalid
              "
              >Password is required</span
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
      <template v-slot:modalFooter>
        <div class="text-center my-32">
          <button
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
  name: 'LoginModal',
  components: { Modal },
  setup(props, { root }) {
    const store = root.$store

    //
    //vuelidate rules
    const rules = {
      form: {
        email: { required, email },
        password: { required }
      }
    }

    const data = reactive({
      form: {
        email: '',
        password: ''
      },

      loading: false
    })

    const v$ = useVuelidate(rules, data)

    const openForgotPasswordModal = () => {
      clearData()
      store.dispatch('general/openModal', {
        id: 'forgotPasswordModal'
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
        email: '',
        password: ''
      }
      !v$.value.form.$reset()
    }

    const submit = async () => {
      v$.value.form.$touch()
      if (!v$.value.form.$invalid) {
        data.loading = true
        await store.dispatch('auth/login', data.form)
        data.loading = false
      }
    }

    return {
      ...toRefs(data),
      v$,
      clearData,
      openForgotPasswordModal,
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
  cursor: pointer;
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
