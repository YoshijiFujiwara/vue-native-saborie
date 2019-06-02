import Vue from 'vue-native-core'

export default {
  namespaced: true,
  state: {
    item: 0
  },
  getters: {

  },
  actions: {
    changeSumTime ({ commit, state }, sumTime) {
      commit('setSumTime', sumTime)
    }
  },
  mutations: {
    setSumTime (state, sumTime) {
      Vue.set(state, 'item', sumTime)
    }
  }
}
