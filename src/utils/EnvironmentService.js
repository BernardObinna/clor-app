export default class EnvironmentService {
  // static app = process.env.VUE_APP_APP_URL;
  static api = process.env.VUE_APP_API_URL + process.env.VUE_APP_API_VERSION
}
