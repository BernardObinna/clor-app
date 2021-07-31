import axios from 'axios'
import Vue from 'vue'

const axiosInstance = axios.create({
  baseURL: 'http://34.123.40.176/v1/',
  headers: {
    Authorization: 'Bearer {token}'
  }
})

Vue.prototype.$axios = axiosInstance
export default axiosInstance
