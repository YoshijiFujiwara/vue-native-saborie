import axios from 'axios'
import Vue from 'vue-native-core'
import { Platform } from 'react-native'

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:8000/api/v1' : 'http://10.0.2.2:8000/api/v1'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {

  },
  actions: {
    fetchSabotas ({ commit, state }) {
      return axios.get(`${BASE_URL}/sabotas`)
        .then(res => {
          const sabotas = res.data
          commit('setSabotas', sabotas)
          return state.items
        })
    }
  },
  mutations: {
    setSabotas (state, sabotas) {
      Vue.set(state, 'items', sabotas)
    }
  }
}
