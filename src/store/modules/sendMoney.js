import $axios from '../../utils/axios'
import endpoints from '../../utils/Endpoints'
import { handleRequest } from '../../utils/Connection'
// import util from '../../utils/UtilsService'
import UtilsService from '../../utils/UtilsService'

export const state = {
  usdRates: ''
}

export const getters = {
  getDollarRates(state) {
    return state.usdRates
  }
}

export const mutations = {
  SET_RATES(state, rates) {
    state.usdRates = Number(rates.wireinNaira)
  }
}

export const actions = {
  async getRates({ commit }) {
    // util.showMessage('test', 'error')
    const [res] = await handleRequest($axios.get(endpoints.rates))
    if (res) commit('SET_RATES', res.rates)
  },

  async sendDollarToNaira({ commit }, payload) {
    const [res, error] = await handleRequest(
      $axios.post(endpoints.sendDollarToNaira, payload)
    )
    if (res) return [res, null]
    else {
      UtilsService.showMessage(error.data.message, 'error')
      return [null, error]
    }
  }
}
