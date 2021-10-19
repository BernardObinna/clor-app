import $axios from '../../utils/axios'
import endpoints from '../../utils/Endpoints'
import { handleRequest } from '../../utils/Connection'
import UtilsService from '../../utils/UtilsService'

export const state = {
  usdRates: '',
  nameEnquiry: {
    loading: false,
    name: null
  }
}

export const getters = {
  getDollarRates(state) {
    return state.usdRates
  },

  getNameEnquiry(state) {
    return state.nameEnquiry
  }
}

export const mutations = {
  setRates(state, rates) {
    state.usdRates = Number(rates.wireinNaira)
  },

  setNameEnquiry(state, value) {
    state.nameEnquiry = value
  }
}

export const actions = {
  async getRates({ commit }) {
    // util.showMessage('test', 'error')
    const [res] = await handleRequest($axios.get(endpoints.rates))
    if (res) commit('setRates', res.rates)
  },

  async initTransaction(context, payload = null) {
    //use the anonymous transaction initiation endpoint if a payload is passed
    let url = payload ? 'initTransactionForAnonymousUser' : 'initTransaction'

    const [res] = await handleRequest(
      $axios.post(endpoints[url], payload ? payload : '')
    )
    return [res]
  },

  async getCryptoAddress(context, payload) {
    const [res] = await handleRequest(
      $axios.post(endpoints.getCryptoAddress, payload)
    )
    return [res]
  },

  async sendDollarToNaira(context, payload) {
    const [res, error] = await handleRequest(
      $axios.post(endpoints.sendDollarToNaira, payload)
    )
    if (res) return [res, null]
    else {
      UtilsService.showMessage(error.data.message, 'error')
      return [null, error]
    }
  },

  async nameEnquiry({ commit }, payload) {
    commit('setNameEnquiry', { loading: true })
    const [res, error] = await handleRequest(
      $axios.post(endpoints.nameEnquiry, payload)
    )
    if (res) {
      commit('setNameEnquiry', { loading: false, name: res.data.account_name })
      return [res.data.account_name, null]
    } else {
      UtilsService.showMessage(error.data.message, 'error')
      commit('setNameEnquiry', { loading: false })
      return [null, error]
    }
  }
}
