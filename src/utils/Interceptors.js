import axios from 'axios'
import { store } from '@/store/store'

import { Auth } from './Auth'
import UtilsService, { MessageType } from '@/utils/UtilsService'

export const Interceptor = () => {
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
