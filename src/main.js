import Vue from 'vue'
import AOS from 'aos'

import vuetify from '@/plugins/vuetify'
import "@/utilities/vue-sweetalert2"
import "@/utilities/filters/fromNowAgo"

import App from './App.vue'
import router from './router'
import store from "./store"

import 'aos/dist/aos.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),

  mounted() {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
      easing: 'ease',
      once: false,
      anchorPlacement: 'top-bottom',
    })
  },
}).$mount('#app')


