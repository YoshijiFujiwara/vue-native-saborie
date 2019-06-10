import Vuex from 'vuex'
import Vue from 'vue-native-core'
import auth from './modules/auth'
import sabotas from './modules/sabotas'
import searchSabotas from './modules/searchSabotas'
import mistakeSummary from './modules/mistakeSummary'
import shouldDoneSummary from './modules/shouldDoneSummary'
import mySabotas from './modules/mySabotas'
import comments from './modules/comments'
import selectedTime from './modules/selectedTime'
import sumTime from './modules/sumTime'
import linkedSabotas from './modules/linkedSabotas'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    sabotas,
    searchSabotas,
    mistakeSummary,
    shouldDoneSummary,
    mySabotas,
    comments,
    selectedTime,
    sumTime,
    linkedSabotas
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
