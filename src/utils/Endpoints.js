import EnvironmentService from '@/utils/EnvironmentService'

export default class Endpoints {
  /**
   *
   * general
   *
   */
  static banks = EnvironmentService.api + '/settings/banks'

  /**
   *
   * Auth Section
   *
   */
  static refreshToken = EnvironmentService.api + '/auth/refresh'
  static login = EnvironmentService.api + '/auth/login'
  static logout = EnvironmentService.api + '/auth/logout'
  static forgotPassword = EnvironmentService.api + '/auth/forgot-password'
  static resetPassword = EnvironmentService.api + '/auth/reset-password'
  static signUp = EnvironmentService.api + '/auth/register'
  static currentUser = EnvironmentService.api + '/users/active-user'

  /**
   *
   * send money
   *
   */
  static sendDollarToNaira = EnvironmentService.api + '/transaction/pay_anon'
  static nameEnquiry = EnvironmentService.api + '/transaction/verifyBank'
  static initTransaction = EnvironmentService.api + '/transactions/initiate'
  static initTransactionForAnonymousUser = this.initTransaction + '/anon'
  static getCryptoAddress = EnvironmentService.api + '/transactions/recipient'

  /**
   *
   * rates Section
   *
   */
  static rates = EnvironmentService.api + '/settings'

  // static xx(id) {
  //   return EnvironmentService.api + '/playlists/' + id + '/subscribe'
  // }
}
