<template>
  <div>
    <modal
      modal-id="resetPasswordModal"
      modal-title-id="resetPasswordModalTitle"
      modal-title="Change Password"
      @closeModal="clearData"
    >
      <template v-slot:modalBody>
        <p class="mt-8">
          Enter and confirm your new password for
          <span>adegokedamolat@gmail.com</span>
        </p>
        <form class="form-block">
          <div class="mt-31 mb-40">
            <input
              type="password"
              class="form-control"
              id="new-password"
              placeholder="New password"
              aria-label="New password"
              v-model="form.password"
            />

            <span
              class="attention"
              v-if="
                v$.form.password.$error && v$.form.password.required.$invalid
              "
              >Password is required</span
            >
          </div>

          <div class="mb-16">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Confirm password"
              aria-label="Confirm password"
              v-model="form.confirmPassword"
            />

            <span
              class="attention"
              v-if="
                v$.form.confirmPassword.$error &&
                v$.form.confirmPassword.required.$invalid
              "
              >Please retype your password</span
            >

            <span
              class="attention"
              v-if="
                v$.form.confirmPassword.$error &&
                !v$.form.confirmPassword.required.$invalid &&
                v$.form.confirmPassword.passwordsMatch.$invalid
              "
              >Passwords don't match</span
            >
          </div>
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
import { required } from '@vuelidate/validators'
// import UtilsService from '../../utils/UtilsService'
export default {
  name: 'ResetPasswordModal',
  components: { Modal },
  setup(props, { root }) {
    const store = root.$store

    //
    //vuelidate rules
    const rules = {
      form: {
        password: { required },
        confirmPassword: {
          required,
          passwordsMatch: (value) => value === data.form.password
        }
      }
    }

    const data = reactive({
      form: {
        password: '',
        confirmPassword: ''
      },

      loading: false
    })

    const v$ = useVuelidate(rules, data)

    const clearData = () => {
      data.form = {
        password: '',
        confirmPassword: ''
      }
      !v$.value.form.$reset()
    }

    function openLoginModal() {
      clearData()
      store.dispatch('general/openModal', {
        id: 'loginModal'
      })
    }

    const submit = async () => {
      v$.value.form.$touch()
      if (!v$.value.form.$invalid) {
        data.loading = true
        const res = await store.dispatch('auth/resetPassword', {
          password: data.form.password,
          token: root.$route.query.token
        })
        if (res) openLoginModal()
        data.loading = false
      }
    }

    return {
      ...toRefs(data),
      v$,
      clearData,
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
