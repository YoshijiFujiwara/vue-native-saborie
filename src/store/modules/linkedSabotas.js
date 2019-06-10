import axiosInstance from '@/services/axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {

  },
  actions: {
    fetchSabotas ({ commit, state }, { type, sabotaId, attribute }) { // typeは'shouldDone', 'mistake', 'time'の３種類
      switch (type) {
        case 'shouldDone':
        case 'mistake':
          // shouldDone, mistakeの場合はノードとの関連性で検索
          return axiosInstance.post('/linked_sabotas', { type, sabotaId })
            .then(res => {
              const sabotas = res.data
              commit('setItems', { items: sabotas, resource: 'linkedSabotas' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
              return state.items
            })
            .catch(err => alert(JSON.stringify(err)))

        case 'time':
          // timeの場合は、他の検索ルートの力を借りる
          return axiosInstance.post('/search_sabotas', { 'keyWord': '', 'shouldDone': '', 'mistake': '', 'time': attribute, 'body': '' })
            .then(res => {
              const sabotas = res.data
              commit('setItems', { items: sabotas, resource: 'linkedSabotas' }, { root: true }) // root: true を入れないと、index.jsの中のsetItemsは動かせない
              return state.items
            })
            .catch(err => alert(JSON.stringify(err)))
      }
    }
  },
  mutations: {

  }
}
