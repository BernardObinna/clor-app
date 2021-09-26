export const Auth = {
  get: {
    accessToken() {
      // return localStorage.getItem('authToken')
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGUzMzM2MzFlODMxMjNlMzhjYmNmMjciLCJpYXQiOjE2MzI2Njk1NjUsImV4cCI6MTYzMjY3MTM2NSwidHlwZSI6ImFjY2VzcyJ9.21nXvxcr2I4I4fd6MXsqzVH325ncWMLBhAYrHnA9N2U'
    },
    refreshToken() {
      return localStorage.getItem('refreshToken')
    },
    URLIntended() {
      return localStorage.getItem('comingFrom')
    }
  },
  set: {
    accessToken(token) {
      return localStorage.setItem('authToken', token)
    },
    refreshToken(token) {
      return localStorage.setItem('refreshToken', token)
    },
    URLIntended(url) {
      return localStorage.setItem('comingFrom', url)
    }
  },
  clear: {
    accessToken() {
      return localStorage.removeItem('authToken')
    },
    refreshToken() {
      return localStorage.removeItem('refreshToken')
    },
    allTokens() {
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
    },
    URLIntended() {
      return localStorage.removeItem('comingFrom')
    }
  },
  check: {
    isAuthenticated() {
      return (
        localStorage.getItem('authToken') &&
        localStorage.getItem('refreshToken')
      )
    },
    isPasswordValid(password) {
      if (password !== '' && password.length >= 8) return true
    },
    validateEmail(email) {
      // eslint-disable-next-line no-useless-escape
      const re =
        '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
      return re.test(String(email).toLowerCase())
    },
    testAllPasswordStrength(password) {
      return new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[!"#$%&\'()*+,-.\\/:;<=>?@\\[\\]^_`{|}~])(?=.{8,})'
      ).test(password)
    },
    passwordOneUpperLetter(password) {
      return new RegExp('^(?=.*[A-Z])').test(password)
    },
    passwordOneLowerLetter(password) {
      return new RegExp('^(?=.*[a-z])').test(password)
    },
    passwordOneDigitLetter(password) {
      return new RegExp('^(?=.*[0-9])').test(password)
    },
    passwordOneSpecialLetter(password) {
      return new RegExp(
        '^(?=.*?[!"#$%&\'()*+,-.\\/:;<=>?@\\[\\]^_`{|}~])'
      ).test(password)
    },
    password8CharactersLong(password) {
      return new RegExp('^(?=.{8,})').test(password)
    }
  },
  action: {
    logout(rememberLocation = true) {
      if (rememberLocation) Auth.set.URLIntended(window.location.pathname)

      // TODO: Route to general logout
      // store.dispatch('logout').then();
    }
  }
}
