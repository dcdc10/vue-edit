import Vue from 'vue'
import App from './App.vue'
import VueThinModal from 'vue-thin-modal'
import 'vue-thin-modal/dist/vue-thin-modal.css'

Vue.use(VueThinModal)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
