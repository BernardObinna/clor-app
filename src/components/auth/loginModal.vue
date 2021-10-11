<template>
  <div>
    <modal
      modal-id="loginModal"
      modal-title-id="loginModalTitle"
      modal-title="Login"
    >
      <template v-slot:modalBody>
        <form class="form-block">
          <div class="my-28">
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

          <div class="my-28">
            <p
              class="text-primary text-end pointer"
              @click="openForgotPassword"
            >
              Forgot Password ?
            </p>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              aria-label="password"
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

          <p class="text-center">
            Don't have an account?
            <span class="text-primary pointer" @click="openSignUp"
              >Sign up</span
            >
          </p>
        </form>
      </template>
      <template v-slot:modalFooter>
        <div class="text-center">
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
  name: 'Login',
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

    function openForgotPassword() {
      store.dispatch('general/openModal', {
        id: 'forgotPasswordModal'
      })
    }

    function openSignUp() {
      store.dispatch('general/openModal', {
        id: 'signUpModal'
      })
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
      openForgotPassword,
      openSignUp,
      submit
    }
  }
}
</script>
