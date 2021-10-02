import axios from './axios.js'
import store from '@/store'

import { Auth } from './Auth'
import UtilsService, { MessageType } from '@/utils/UtilsService'

const interceptor = () => {
  //Make sure the interceptor is declared before ur vue instance is created.
  // Make sure you're creating your interceptors before you're creating the Vue instance in main.js.
  let isRefreshing = false

  // Request
  axios.interceptors['request'].use(function (config) {
    if (Auth.check.isAuthenticated()) {
      config.headers['Authorization'] = 'Bearer ' + Auth.get.accessToken()
    }

    return config
  })

  // Response
  axios.interceptors['response'].use(
    function (response) {
      response.headers['Access-Control-Allow-Origin'] = '*'

      return response
    },
    function (error) {
      const errResponse = error.response

      if (errResponse.status === 419 && Auth.get.refreshToken()) {
        if (!isRefreshing) {
          isRefreshing = true

          store
            .dispatch('refreshToken')
            .then(() => {
              error.response.config.headers['Authorization'] =
                'Bearer ' + Auth.get.accessToken()

              // Call the axios request code-section again
              return axios.request(error.response.config)
            })
            .finally(() => (isRefreshing = false))
        }

        // TODO Handle case where refreshToken has expired
      } else if (errResponse.status === 401) {
        UtilsService.showMessage(
          'You will be required to log in again.',
          MessageType.Error,
          'Session expired'
        )
        Auth.action.logout()
      }

      return Promise.reject(errResponse)
    }
  )
}

export default interceptor
