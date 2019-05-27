<template>
  <view
    class="container"
    :class="{'container-android': Platform.OS === 'android'}"
  >
    <!--  認証関連が解決していれば表示する(かならずしも、ログインしてなアカンわけじゃないよ)  -->
    <navigation v-if="isAuthResolved" />
    <nb-container
      v-else
      class="spinner-container"
    >
      <nb-spinner color="blue " />
    </nb-container>
  </view>
</template>

<script>
import Vue from 'vue-native-core'
import { VueNativeBase } from 'native-base'
import { Platform } from 'react-native'

import store from './store'
import Navigation from './navigation'
import Vuelidate from 'vuelidate'

import ScreenWithDrawer from '@/components/ScreenWithDrawer'
import InputWithError from '@/components/InputWithError'
import AppMessage from '@/components/AppMessage'
import AppHeader from '@/components/AppHeader'
import AppTimePicker from '@/components/AppTimePicker'
import AppNavigationEvents from '@/react-components/AppNavigationEvents' // reactのコンポーネントを読み込む

// プラグインの登録
Vue.use(VueNativeBase)
Vue.use(Vuelidate)

// コンポーネントの登録
Vue.component('ScreenWithDrawer', ScreenWithDrawer)
Vue.component('AppMessage', AppMessage)
Vue.component('AppHeader', AppHeader)
Vue.component('AppTimePicker', AppTimePicker)
Vue.component('InputWithError', InputWithError)
Vue.component('AppNavigationEvents', AppNavigationEvents)

// vuex storeをvueのグローバルコンテキストに追加
Vue.prototype.$store = store

export default {
  components: {
    Navigation
  },
  data () {
    return {
      Platform
    }
  },
  computed: {
    isAuthResolved () {
      return this.$store.state.auth.isAuthResolved
    }
  },
  created () {
    this.$store.dispatch('auth/verifyUser')
      .catch(() => {}) // warning出ないように
  }
}
</script>

<style>
  .container {
    flex: 1;
  }
  .container-android {
    padding-top: 24px; /* androidの高さ調整 */
  }
  .spinner-container {
    display: flex;
    justify-content: center;
  }
</style>
