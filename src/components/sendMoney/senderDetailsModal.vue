<template>
  <div>
    <modal
      modal-id="senderDetailsModal"
      modal-title-id="senderDetailsModalTitle"
      modal-title="Sender Information"
      @closeModal="clearData"
    >
      <template v-slot:modalBody>
        <form class="form-block">
          <div class="mt-31 row">
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                id="sign-up-first-name"
                aria-label="First name"
                placeholder="First name"
                v-model="form.firstName"
              />

              <span
                class="attention"
                v-if="
                  v$.form.firstName.$error &&
                  v$.form.firstName.required.$invalid
                "
                >First name required</span
              >
            </div>

            <div class="col-6">
              <input
                type="text"
                class="form-control"
                id="last-name"
                aria-label="Last name"
                placeholder="Last name"
                v-model="form.lastName"
              />

              <span
                class="attention"
                v-if="
                  v$.form.lastName.$error && v$.form.lastName.required.$invalid
                "
                >Last name required</span
              >
            </div>
          </div>

          <div class="my-40">
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

          <div class="mb-40">
            <input
              type="tel"
              class="form-control"
              id="signUp-phone"
              aria-label="Phone number"
              placeholder="phone number"
              v-model="form.phone"
              @keydown="onlyNumbers"
            />
            <span
              class="attention"
              v-if="v$.form.phone.$error && v$.form.phone.required.$invalid"
              >Please provide your phone number</span
            >

            <span
              class="attention"
              v-if="v$.form.phone.$error && v$.form.phone.numeric.$invalid"
              >Please provide a valid phone number</span
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
import { required, email, numeric } from '@vuelidate/validators'
export default {
  name: 'SenderDetailsModal',
  components: { Modal },
  setup(props, { root, emit }) {
    const store = root.$store

    //vuelidate rules
    const rules = {
      form: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phone: { required, numeric }
      }
    }

    const data = reactive({
      form: {
        firstName: '',
        email: '',
        lastName: '',
        phone: ''
      },

      loading: false
    })

    const v$ = useVuelidate(rules, data)

    function closeModal() {
      clearData()
      store.dispatch('general/closeModal', {
        id: 'senderDetailsModal'
      })
    }

    const clearData = () => {
      data.form = {
        firstName: '',
        email: '',
        lastName: '',
        phone: ''
      }
      !v$.value.form.$reset()
    }

    const submit = async () => {
      v$.value.form.$touch()
      if (!v$.value.form.$invalid) {
        data.loading = true
        let payload = {
          name: `${data.form.firstName} ${data.form.lastName}`,
          email: data.form.email
        }

        //generate the tracking ID for crypto transactions
        const [res] = await store.dispatch('sendMoney/initTransaction', payload)

        if (res) {
          emit('emitTrackingID', res.trackingId)
          closeModal()
        }
        data.loading = false
      }
    }

    return {
      ...toRefs(data),
      v$,
      clearData,
      closeModal,
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
