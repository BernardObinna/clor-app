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
  getUserX() {
    return Auth.get.userX()
  }
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

    if (res) {
      UtilsService.showMessage(
        'Registration successful. Please login',
        'success'
      )
      return true
    } else {
      UtilsService.showMessage(error.data.message, 'error')
      return null
    }
  },

  async login(context, payload) {
    const [res, error] = await handleRequest(
      $axios.post(endpoints.login, payload)
    )

    if (res && res.tokens && res.tokens.access && res.tokens.access.token) {
      Auth.set.accessToken(res.tokens.access.token)
      Auth.set.refreshToken(res.tokens.refresh.token)
      Auth.set.userX(res.user)
      location.reload()
    } else {
      UtilsService.showMessage(error.data.message, 'error')
    }
  },

  async forgotPassword(context, payload) {
    const [res, error] = await handleRequest(
      $axios.post(endpoints.forgotPassword, payload)
    )

    if (res) {
      return true
    } else {
      UtilsService.showMessage(error.data.message, 'error')
      return null
    }
  },

  async resetPassword(context, payload) {
    const [res, error] = await handleRequest(
      $axios.post(`${endpoints.resetPassword}?${payload.token}`, {
        password: payload.password
      })
    )

    if (res) {
      return res
    } else {
      UtilsService.showMessage(error.data.message, 'error')
      return null
    }
  },

  async refreshToken({ dispatch }) {
    const [res] = await handleRequest(
      $axios.post(endpoints.refreshToken, {
        refreshToken: Auth.get.refreshToken()
      })
    )

    if (res && res.tokens && res.tokens.access && res.tokens.access.token) {
      Auth.set.accessToken(res.tokens.access.token)
      Auth.set.refreshToken(res.tokens.refresh.token)
      Auth.set.userX(res.user)
      location.reload()
    } else {
      await dispatch('logout')
      UtilsService.showMessage('Session expired. Please login again', 'error')
    }
  },

  async logout() {
    // const [res, error] =
    await handleRequest(
      $axios.post(endpoints.logout, { refreshToken: Auth.get.refreshToken() })
    )

    // if (res) {
    Auth.clear.allTokens()
    location.href = '/'
    // } else {
    //   UtilsService.showMessage(error.data.message, 'error')
    //   return null
    // }
  }
}
