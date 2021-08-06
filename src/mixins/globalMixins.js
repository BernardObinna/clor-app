import Vue from 'vue'
import UtilsService from '../utils/UtilsService'

Vue.mixin({
  methods: {
    // Prevent Non Numbers keys from being inputed into a text field
    onlyNumbers(e) {
      return UtilsService.onlyNumbers(e)
    }
  }
})
