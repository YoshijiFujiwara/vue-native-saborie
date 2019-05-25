import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { Platform } from 'react-native'

Vue.use(Vuex)

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:8000/api/v1' : 'http://10.0.2.2:8000/api/v1'

export default new Vuex.Store({
  state: {
    todos: [],
    sabotas: []
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
    setSabotas (state, sabotas) {
      Vue.set(state, 'sabotas', sabotas)
    }
  }
})
