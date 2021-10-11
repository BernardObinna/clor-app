import $axios from '../../utils/axios'
import endpoints from '../../utils/Endpoints'
import { handleRequest } from '../../utils/Connection'
import UtilsService from '../../utils/UtilsService'
import { Auth } from '../../utils/Auth'

export const state = {
  // banks: {
  //   loading: true,
  //   banks: []
  // },
}

export const getters = {
  // getBanks(state) {
  //   return state.banks
  // },
}

export const mutations = {
  // setBanks(state, value) {
  //   state.banks = value
  // },
}

export const actions = {
  async signUp(context, payload) {
    const [res, error] = await handleRequest(
      $axios.post(endpoints.signUp, payload)
    )

    if (res && res.tokens && res.tokens.access && res.tokens.access.token) {
      Auth.set.accessToken(res.tokens.access.token)
      location.reload()
    } else {
      UtilsService.showMessage(error.data.message, 'error')
    }
  },

  async login(context, payload) {
    const [res, error] = await handleRequest(
      $axios.post(endpoints.login, payload)
    )

    if (res && res.tokens && res.tokens.access && res.tokens.access.token) {
      Auth.set.accessToken(res.tokens.access.token)
      location.reload()
    } else {
      UtilsService.showMessage(error.data.message, 'error')
    }
  }
}
