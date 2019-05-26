import axios from 'axios'
import axiosInstance from '@/services/axios'
import Vue from 'vue-native-core'
import { Platform, AsyncStorage } from 'react-native'
import jwtDecode from 'jwt-decode'

const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:8000/api/v1' : 'http://10.0.2.2:8000/api/v1'

// トークンの有効期限の検証
const isTokenValid = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token)
    console.log(decodedToken.time * 1000)
    console.log(new Date().getTime())

    return decodedToken && (decodedToken.time * 1000) > new Date().getTime()
  }
  return false
}

export default {
  namespaced: true,
  state: {
    user: null,
    isAuth: false
  },
  getters: {},
  actions: {
    login ({ commit, state }, userData) {
      return axios.post(`${BASE_URL}/users/login`, userData)
        .then(res => {
          const user = res.data
          AsyncStorage.setItem('saborie-jwt', user.jwt.token)
          user.password = userData.password
          commit('setAuthUser', user)
          return state.user
        })
    },
    fetchCurrentUser ({ commit, state }) {
      return axiosInstance.get(`${BASE_URL}/users/me`)
        .then(res => {
          const user = res.data
          AsyncStorage.setItem('saborie-jwt', user.jwt.token)
          commit('setAuthUser', user)
          return state.user
        })
    },
    async verifyUser ({ dispatch }) {
      const jwt = await AsyncStorage.getItem('saborie-jwt')
      console.log(jwt)
      if (jwt && isTokenValid(jwt)) {
        const user = await dispatch('fetchCurrentUser')
        console.log(user)
        return user ? Promise.resolve(jwt) : Promise.reject('ログインユーザーを取得できません')
      } else {
        return Promise.reject('トークンの有効期限が切れています')
      }
    }
  },
  mutations: {
    setAuthUser (state, user) {
      return state.user = user
    }
  }
}
