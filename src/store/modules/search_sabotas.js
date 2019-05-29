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
    searchSabotas ({ commit, state }, searchData) {
      console.log(searchData)
      return axiosInstance.post('/search_sabotas', searchData)
        .then(res => {
          console.log(res.data)
          const sabotas = res.data
          commit('setItems', { items: sabotas, resource: 'searchSabotas' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
          return state.items
        })
        .catch(err => alert(JSON.stringify(err)))
    }
  },
  mutations: {

  }
}
