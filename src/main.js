import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionApi from '@vue/composition-api'
import { VMoney } from 'v-money'
import { axiosInstance } from './utils/axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.use(VueCompositionApi)
Vue.use(axiosInstance)
Vue.directive('money', VMoney)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
