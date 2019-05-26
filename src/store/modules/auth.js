import axios from 'axios'
import Vue from 'vue-native-core'
import { Platform, AsyncStorage } from 'react-native'

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:8000/api/v1' : 'http://10.0.2.2:8000/api/v1'

export default {
  namespaced: true,
  state: {
    user: {},
    isAuth: false
  },
  getters: {},
  actions: {
    login ({ commit, state }, userData) {
      return axios.post(`${BASE_URL}/login`, userData)
        .then(res => {
          const user = res.data
          AsyncStorage.setItem('saborie-jwt', user.jwt.token)
          user.password = userData.password
          commit('setAuthUser', user)
          return state.user
        })
    }
  },
  mutations: {
    setAuthUser (state, user) {
      return state.user = user
    }
  }
}
