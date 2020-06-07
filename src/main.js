import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import axios from 'axios'
import './assets/scss/app.scss'

Vue.use(Buefy)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:5000'
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
