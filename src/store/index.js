import Vuex from 'vuex'
import Vue from 'vue-native-core'
import sabotas from './modules/sabotas'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sabotas
  },
  state: {

  },
  getters: {},
  actions: {

  },
  mutations: {
    // resourceで、sabotaかuserかなどを判別する
    setItems (state, { items, resource }) {
      Vue.set(state[resource], 'items', items)
    }
  }
})
