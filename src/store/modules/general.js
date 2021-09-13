import $axios from '../../utils/axios'
import endpoints from '../../utils/Endpoints'
import { handleRequest } from '../../utils/Connection'
// import UtilsService from '../../utils/UtilsService'

export const state = {
  banks: {
    loading: false,
    banks: []
  }
}

export const getters = {
  getBanks(state) {
    return state.banks
  }
}

export const mutations = {
  setBanks(state, value) {
    state.banks = value
  }
}

export const actions = {
  async getBanks({ commit }) {
    // UtilsService.showMessage('test', 'error')
    commit('setBanks', { loading: true })
    const [res] = await handleRequest($axios.get(endpoints.banks))

    if (res) {
      const banks = res.data.map((bank) => {
        return { ...bank, label: bank.name, id: bank.id }
      })
      commit('setBanks', { loading: false, banks })
      // } else commit('setBanks', { loading: false })
    } else await this.getBanks({ commit })
  }
}
