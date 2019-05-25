import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import sabotas from './modules/sabotas'
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    sabotas
  },
  state: {
    todos: []

  },
  getters: {},
  actions: {
    fetchTodos ({ commit, state }) {
      return axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res => {
          const todos = res.data
          commit('setTodos', todos)
          return state.todos
        })
    },
    fetchSabotas ({ commit, state }) {
      return axios.get(`${BASE_URL}/sabotas`)
        .then(res => {
          const sabotas = res.data
          commit('setSabotas', sabotas)
          return state.sabotas
        })
    }
  },
  mutations: {
    setTodos (state, todos) {

    },

  }
})
