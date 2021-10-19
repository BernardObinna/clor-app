export class ConnectionErrors {
  loading = false
  errorMessage = ''
  validationErrors = {}
}

export class ConnectionTracker {
  loading = false

  errors = new ConnectionErrors()

  constructor() {}

  static performingAction() {
    const c = new ConnectionTracker()

    c.loading = true
    c.errors.loading = false

    return c
  }

  static hasErrors(errorMessage = null, validationErrors = null) {
    const c = new ConnectionTracker()

    c.loading = false
    c.errors.loading = true

    if (errorMessage) {
      c.errors.errorMessage = errorMessage
    }

    if (validationErrors) {
      c.errors.validationErrors = validationErrors
    }

    return c
  }

  static resetConnections() {
    return new ConnectionTracker()
  }
}

export async function handleRequest(promise) {
  try {
    const data = await promise
    return [data.data || true, null]
  } catch (e) {
    return [null, e.response ? e.response : e]
  }
}
