import axiosInstance from '@/services/axios'
import { AsyncStorage } from 'react-native'
import jwtDecode from 'jwt-decode'

// トークンの有効期限の検証
const isTokenValid = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token)
    return decodedToken && (decodedToken.time * 1000) > new Date().getTime()
  }
  return false
}

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false
  },
  getters: {
    isAuth (state) {
      return !!state.user // true or falseに変換
    }
  },
  actions: {
    login ({ commit, state }, userData) {
      return axiosInstance.post('/users/login', userData)
        .then(res => {
          const user = res.data
          AsyncStorage.setItem('saborie-jwt', user.jwt.token)
          user.password = userData.password
          commit('setAuthUser', user)
          return state.user
        })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        AsyncStorage.removeItem('saborie-jwt')
        commit('setAuthUser', null)
        resolve(true)
      })
    },
    register (context, userData) {
      return axiosInstance.post('/users/register', userData)
    },
    fetchCurrentUser ({ commit, state }) {
      return axiosInstance.get('/users/me')
        .then(res => {
          const user = res.data
          AsyncStorage.setItem('saborie-jwt', user.jwt.token)
          commit('setAuthUser', user)
          return state.user
        })
        .catch(() => undefined) // verifyUser内のawait でresolveされるように
    },
    async verifyUser ({ dispatch, commit }) {
      const jwt = await AsyncStorage.getItem('saborie-jwt')
      if (jwt && isTokenValid(jwt)) {
        const user = await dispatch('fetchCurrentUser')
        commit('resolveAuth')
        return user ? Promise.resolve(jwt) : Promise.reject('ログインユーザーを取得できません')
      } else {
        commit('resolveAuth')
        return Promise.reject('トークンの有効期限が切れています')
      }
    }
  },
  mutations: {
    setAuthUser (state, user) {
      state.user = user
    },
    resolveAuth (state) {
      state.isAuthResolved = true
    }
  }
}
