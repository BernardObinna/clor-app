import axios from 'axios'

export const axiosInstance = {
  install(Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: 'http://localhost:8000/api/',
      headers: {
        Authorization: 'Bearer {token}'
      }
    })
  }
}
