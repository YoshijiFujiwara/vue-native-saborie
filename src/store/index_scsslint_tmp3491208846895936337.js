import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {},
  actions: {
    fetchTodos({commit, state}) {
      return axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res => {
          const todos = res.data
          commit('setTodos', todos)
          return state.todos
        })
    }
  },
  mutations: {
    setTodos (state, todos) {

    }
  }
})
