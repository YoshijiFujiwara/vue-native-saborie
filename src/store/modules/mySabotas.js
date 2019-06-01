import axiosInstance from '@/services/axios'
import Vue from 'vue-native-core'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {

  },
  actions: {
    fetchSabotas ({ commit, state }) {
      return axiosInstance.get('/sabotas/me')
        .then(res => {
          console.log(JSON.stringify(res.data))
          const sabotas = res.data
          commit('setItems', { items: sabotas, resource: 'mySabotas' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
          return state.items
        })
        .catch(err => alert(JSON.stringify(err)))
    }
  },
  mutations: {
    setSabota (state, sabota) {
      Vue.set(state, 'item', sabota)
    },
    addSabota (state, sabota) {
      state.items.unshift(sabota)
    }
  }
}
