import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
require('mvp.css')
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
