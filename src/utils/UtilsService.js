import { ConnectionTracker } from '@/utils/Connection'
import { ErrorLog } from '@/utils/ErrorLog'
import Vue from 'vue'
import dayjs from 'dayjs'
// import moment fro
// import {notification} from 'ant-design-vue';

export class MessageType {
  static Info = 'info'
  static Success = 'success'
  static Error = 'error'
  static Warning = 'warning'
}

export default class UtilsService {
  static nameFromEmail(email) {
    return email.substring(0, email.indexOf('@'))
  }

  static getInitialsFromName(name = '') {
    const arr = name.split(' ')
    let initials = arr[0][0] + (arr.length > 1 ? arr[arr.length - 1][0] : '')
    return initials.toUpperCase()
  }

  static pascalize(word) {
    return `${word[0].toUpperCase()}${word.substr(1).toLowerCase()}`
  }

  static fixCamelCase(word) {
    return word.replace(/([a-z])([A-Z])/g, '$1 $2')
  }

  static deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  static showMessage(message, type = MessageType.Success, title = '') {
    Vue.$toast[type](message, title)
  }

  static formatDate(date, format = 'dddd, MMMM Do YYYY, h:mm A') {
    return dayjs(date).format(format)
  }

  static cleanUpErrors(error, defaultAppMessage = null) {
    let connecting

    if (error.status === 400) {
      UtilsService.showMessage(
        error.data.message || 'Some values are not right!',
        MessageType.Error,
        'You missed something'
      )

      connecting = ConnectionTracker.hasErrors(
        error.data.message,
        error.data.data
      )
    } else if (error.status === 0) {
      connecting = ConnectionTracker.hasErrors('Network Error')
    } else {
      connecting = ConnectionTracker.hasErrors(
        ErrorLog.displayError(error, defaultAppMessage)
      )
    }

    return connecting
  }

  static cloneOBJ(obj) {
    if (obj == null || typeof obj !== 'object') return obj
    var copy = obj.constructor()
    for (var attr in obj) {
      // eslint-disable-next-line
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
    }
    return copy
  }

  static deSlug(slug) {
    let words = slug.split('_')

    for (let i = 0; i < words.length; i++) {
      let word = words[i]
      words[i] = word.charAt(0).toUpperCase() + word.slice(1)
    }

    return words.join(' ')
  }

  static onlyAlphabet(evt) {
    evt = evt || window.event
    let charCode = evt.which ? evt.which : evt.keyCode
    if (
      (charCode >= 65 && charCode <= 122) ||
      charCode === 45 ||
      charCode === 13
    ) {
      return true
    }
    evt.preventDefault()
  }

  static onlyNumbers(event) {
    // evt = evt || window.event
    // let charCode = evt.which ? evt.which : evt.keyCode
    // if (
    //   (charCode >= 48 && charCode <= 57) ||
    //   charCode === 45 ||
    //   charCode === 13
    // ) {
    //   return true
    // }
    // evt.preventDefault()

    if (
      event.keyCode == 17 ||
      event.keyCode == 86 ||
      event.keyCode == 91 ||
      event.keyCode == 187
    ) {
      return event
    } else if (
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105) ||
      event.keyCode == 8 ||
      event.keyCode == 9
    ) {
      return event
    } else {
      return event.preventDefault()
    }
  }

  static capitalizeFirstLetter(event) {
    let word = event.target.value
    word = word.trim()
    word = word.charAt(0).toUpperCase() + word.slice(1)
    return word
  }

  static addTextAsInputPrefix(event, prefixText) {
    let word = event.target.value
    word = word.trim()
    word = word.charAt(0).toUpperCase() + word.slice(1)
    if (!word.includes(prefixText)) word = prefixText + ' ' + word
    return word
  }

  static removeScriptsPage() {
    // eslint-disable-next-line no-console
    document.getElementById('scripts_page').innerHTML = ''
  }

  static loadScriptPage(otherScripts = null) {
    let dynamicScripts = ['/js/vendor.min.js', '/js/theme.min.js']

    if (otherScripts) {
      dynamicScripts = otherScripts
    }

    let isFound = false
    const scripts = document.getElementsByTagName('script')
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < scripts.length; i++) {
      if (
        scripts[i].getAttribute('src') != null &&
        scripts[i].getAttribute('src').includes('loader')
      ) {
        isFound = true
      }
    }
    if (!isFound) {
      for (const dynamicScript of dynamicScripts) {
        const node = document.createElement('script')
        node.src = dynamicScript
        node.type = 'text/javascript'
        node.async = false
        document.getElementById('scripts_page').appendChild(node)
      }
    }
  }

  static convertJsonToFormData(json, nestedJson1 = false) {
    let formData = new FormData()
    Object.keys(json).forEach((key) => {
      //this is for adding the filename to blobs.
      if (key == 'file' && json[key]['isBlob'])
        formData.append(key, json[key]['img'], json[key]['fileName'])
      else formData.append(key, json[key])
      //    the line above is for adding all keys including files (not blobs) normally since files already carry their file name
    })
    if (nestedJson1) {
      Object.keys(
        nestedJson1.values ? nestedJson1.values : nestedJson1
      ).forEach((key) => {
        formData.append(
          nestedJson1.values ? `${nestedJson1.key}[${key}]` : key,
          nestedJson1.values ? nestedJson1.values[key] : nestedJson1[key]
        )
      })
    }
    return formData
  }

  static formatAmount(amount, precision = 2) {
    const [nairaPart, koboPart] = Number(amount || 0)
      .toFixed(precision)
      .split('.')
    const nairaPaddedWithCommas = nairaPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    )

    return `${nairaPaddedWithCommas}.${koboPart}`
  }

  static formatMoneyMask(amount, useKobo = false) {
    if (!isNaN(amount)) return
    // Remove the Naira sign and extra space from money and remove all other monetary characters

    if (useKobo) {
      return amount
        .substring(2, amount.length)
        .replace(/[.]+/g, '')
        .replace(/[,]+/g, '')
    } else {
      return amount.substring(2, amount.length).replace(/[,]+/g, '')
    }
  }

  static formatStringMask(str, delimiter = '-') {
    if (!str.length) return
    const rule = `/[${delimiter}]+/g`
    return str.replace(rule, '')
  }
}
