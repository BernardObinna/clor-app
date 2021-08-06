import $axios from '../../utils/axios'
import endpoints from '../../utils/Endpoints'
import { handleRequest } from '../../utils/Connection'
// import util from '../../utils/UtilsService'

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
  }
}
