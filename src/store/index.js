import Vuex from 'vuex'
import Vue from 'vue-native-core'
import auth from './modules/auth'
import sabotas from './modules/sabotas'
import searchSabotas from './modules/search_sabotas'
import comments from './modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    sabotas,
    searchSabotas,
    comments
  },
  state: {

  },
  getters: {},
  actions: {},
  mutations: {
    // resourceで、sabotaかuserかなどを判別する
    setItems (state, { items, resource }) {
      Vue.set(state[resource], 'items', items)
    }
  }
})
