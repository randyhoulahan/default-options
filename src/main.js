import Vue from 'vue'
import App from '../public/App.vue'

Vue.config.productionTip = true
Vue.config.performance = true

new Vue({
  render: h => h(App)
}).$mount('#app')
