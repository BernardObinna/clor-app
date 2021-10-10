import $axios from '../../utils/axios'
import endpoints from '../../utils/Endpoints'
import { handleRequest } from '../../utils/Connection'
// import UtilsService from '../../utils/UtilsService'
import { Modal } from 'bootstrap'

export const state = {
  banks: {
    loading: true,
    banks: []
  },

  currentlyOpenedModalId: ''
}

export const getters = {
  getBanks(state) {
    return state.banks
  },
  getOpenedModalId(state) {
    return state.currentlyOpenedModalId
  }
}

export const mutations = {
  setBanks(state, value) {
    state.banks = value
  },
  setOpenedModalId(state, value) {
    state.currentlyOpenedModalId = value
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
  },

  openModal({ commit, dispatch, getters }, { id, options = {} }) {
    if (getters.getOpenedModalId) {
      dispatch('closeModal', { id: getters.getOpenedModalId })
    }
    const modalId = `${id}`
    const modalInstance = new Modal(document.getElementById(modalId), options)
    commit('setOpenedModalId', modalId)
    modalInstance.show()
  },

  closeModal(context, { id }) {
    const modalId = `${id}`
    const modalInstance = Modal.getInstance(document.getElementById(modalId))
    modalInstance.hide()
  }
}
