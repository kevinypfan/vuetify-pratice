import Vue from 'vue'
import Vuex from 'vuex'
import UI from './ui'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { UI, user }
})
