import Vue from 'vue-native-core'

export default {
  namespaced: true,
  state: {
    createItem: '', // create画面用
    searchItem: '', // search画面用
    editItem: '' // edit画面用
  },
  getters: {

  },
  actions: {
    changeCreateTime ({ commit, state }, selectedTime) {
      commit('setCreateTime', selectedTime)
    },
    changeSearchTime ({ commit, state }, selectedTime) {
      commit('setSearchTime', selectedTime)
    },
    changeEditTime ({ commit, state }, selectedTime) {
      commit('setEditTime', selectedTime)
    }
  },
  mutations: {
    setCreateTime (state, selectedTime) {
      Vue.set(state, 'createItem', selectedTime)
    },
    setSearchTime (state, selectedTime) {
      Vue.set(state, 'searchItem', selectedTime)
    },
    setEditTime (state, selectedTime) {
      Vue.set(state, 'editItem', selectedTime)
    }
  }
}
