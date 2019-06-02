import axiosInstance from '@/services/axios'
import Vue from 'vue-native-core'

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
      return axiosInstance.get('/sabotas')
        .then(res => {
          const sabotas = res.data
          commit('setItems', { items: sabotas, resource: 'sabotas' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
          return state.items
        })
    },
    fetchSabotaById ({ commit, state }, sabotaId) {
      // クリアする
      commit('setSabota', {})
      return axiosInstance.get(`/sabotas/${sabotaId}`)
        .then(res => {
          const sabota = res.data
          commit('setSabota', sabota)
          // コメントはstate上は、別管理にする
          commit('setItems', { items: sabota.comments, resource: 'comments' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
          return state.item
        })
    },
    createSabota ({ commit }, sabotaData) {
      return axiosInstance.post('/sabotas', sabotaData)
        .then(res => {
          const sabota = res.data
          commit('addSabota', sabota)
          return sabota
        })
        // .catch(err => {
        //   alert(JSON.stringify(err))
        // })
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
