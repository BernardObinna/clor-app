import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionApi from '@vue/composition-api'
import './mixins/globalMixins'
import { VMoney } from 'v-money'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Toast from 'vue-toastification'
import interceptor from './utils/Interceptors'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
Vue.use(Toast)
Vue.use(VueCompositionApi)
Vue.directive('money', VMoney)
Vue.config.productionTip = false

interceptor()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
