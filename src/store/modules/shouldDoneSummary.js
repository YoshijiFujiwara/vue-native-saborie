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
      commit('setItems', { items: [], resource: 'shouldDoneSummary' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
      return axiosInstance.get('/users/summary/should_done')
        .then(res => {
          const shoudDones = res.data
          commit('setItems', { items: shoudDones, resource: 'shouldDoneSummary' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
          return state.items
        })
        .catch(err => alert(JSON.stringify(err)))
    }
  },
  mutations: {

  }
}
