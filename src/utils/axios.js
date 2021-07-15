import axios from 'axios'

export const axiosInstance = {
  install(Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: 'http://34.123.40.176/v1/',
      headers: {
        Authorization: 'Bearer {token}'
      }
    })
  }
}
