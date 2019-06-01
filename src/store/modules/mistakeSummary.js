import axiosInstance from '@/services/axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {

  },
  actions: {
    getSummary ({ commit, state }) {
      commit('setItems', { items: [], resource: 'mistakeSummary' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
      return axiosInstance.get('/users/summary/mistake')
        .then(res => {
          const mistakes = res.data
          commit('setItems', { items: mistakes, resource: 'mistakeSummary' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
          return state.items
        })
        .catch(err => alert(JSON.stringify(err)))
    }
  },
  mutations: {

  }
}
