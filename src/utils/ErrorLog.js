import UtilsService, { MessageType } from '@/utils/UtilsService'

export class ErrorLog {
  static displaySuccess(serverRes, fallbackMessage = 'Success') {
    if (serverRes.data && serverRes.data.message) {
      UtilsService.showMessage(serverRes.data.message, MessageType.Success)
    } else {
      UtilsService.showMessage(fallbackMessage, MessageType.Success)
    }
  }

  static displayError(serverErr, fallbackMessage = 'Something went wrong') {
    if (serverErr.data && serverErr.data.message) {
      UtilsService.showMessage(serverErr.data.message, MessageType.Error)
    } else {
      UtilsService.showMessage(fallbackMessage, MessageType.Error)
    }
  }

  static displayWarning(serverErr, fallbackMessage = 'Something went wrong') {
    if (
      serverErr.response &&
      serverErr.response.data &&
      serverErr.response.data.message
    ) {
      UtilsService.showMessage(
        serverErr.response.data.message,
        MessageType.Warning
      )
    } else {
      UtilsService.showMessage(fallbackMessage, MessageType.Warning)
    }
  }
}

export class ServerResponse {
  static emitErrors(serverErr, skipMessage) {
    if (
      serverErr.response &&
      serverErr.response.data &&
      serverErr.response.data.errors
    ) {
      return serverErr.response.data.errors
    } else if (
      !skipMessage &&
      serverErr.response &&
      serverErr.response.data &&
      serverErr.response.data.message
    ) {
      return serverErr.response.data.message
    }

    return null
  }

  static emitMessage(serverRes) {
    if (serverRes && serverRes.data && serverRes.data.message) {
      return serverRes.data.message
    }

    return null
  }
}
