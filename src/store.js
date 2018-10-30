import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    drawer: false
  },
  mutations: {
    setDark(state) {
      state.dark = !state.dark
    },
    setDrawer(state) {
      state.drawer = !state.drawer
    }
  },
  actions: {

  }
})
