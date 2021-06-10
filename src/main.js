import Vue from 'vue'
import App from './App.vue'
import router from './route.js'

import  BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import YmapPlugin from 'vue-yandex-maps'
const settings = {
  apiKey: "",
  lang: 'en_US',
  coordorder: 'latlong',
  version: '2.1'
}

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(YmapPlugin, settings)

Vue.config.silent = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')