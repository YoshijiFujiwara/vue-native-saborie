import axiosInstance from '@/services/axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {

  },
  actions: {
    createComment ({ commit }, { sabotaId, commentData }) {
      return axiosInstance.post(`/sabotas/${sabotaId}/comments`, commentData)
        .then(res => {
          const comment = res.data
          commit('addComment', comment)
        })
        .catch(err => {
          alert(JSON.stringify(err))
        })
    }
  },
  mutations: {
    addComment (state, comment) {
      // コメントオブジェクトが{}のときもある
      if (state.items && state.items.length > 0) {
        state.items.unshift(comment)
      } else {
        state.items = [comment]
      }
    }
  }
}
