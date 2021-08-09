import EnvironmentService from '@/utils/EnvironmentService'

export default class Endpoints {
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

  /**
   *
   * rates Section
   *
   */
  // static rates = EnvironmentService.api + '/settingsd'
  static rates = EnvironmentService.api + '/settings'

  static subscribeToPlaylist(id) {
    return EnvironmentService.api + '/playlists/' + id + '/subscribe'
  }

  static unsubscribeFromPlaylist(id) {
    return EnvironmentService.api + '/playlists/' + id + '/unsubscribe'
  }
}
