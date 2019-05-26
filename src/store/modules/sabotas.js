import axios from 'axios'
import Vue from 'vue-native-core'
import { Platform } from 'react-native'

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:8000/api/v1' : 'http://10.0.2.2:8000/api/v1'

export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
  },
  getters: {

  },
  actions: {
    fetchSabotas ({ commit, state }) {
      return axios.get(`${BASE_URL}/sabotas`)
        .then(res => {
          const sabotas = res.data
          commit('setItems', { items: sabotas, resource: 'sabotas' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
          return state.items
        })
    },
    fetchSabotaById ({ commit, state }, sabotaId) {
      // クリアする
      commit('setSabota', {})
      return axios.get(`${BASE_URL}/sabotas/${sabotaId}`)
        .then(res => {
          const sabota = res.data
          commit('setSabota', sabota)
          return state.item
        })
    }
  },
  mutations: {
    setSabota (state, sabota) {
      Vue.set(state, 'item', sabota)
    }
  }
}
