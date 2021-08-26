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
  static currentUser = EnvironmentService.api + '/users/active-user'

  /**
   *
   * send money
   *
   */
  static sendDollarToNaira = EnvironmentService.api + '/transaction/pay_anon'
  static nameEnquiry = EnvironmentService.api + '/transaction/verifyBank'

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
