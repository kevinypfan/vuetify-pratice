import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import Toolbar from "./components/Toolbar/Toolbar.vue";
import { createProvider } from './plugins/vue-apollo'

Vue.component('Toolbar', Toolbar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')


