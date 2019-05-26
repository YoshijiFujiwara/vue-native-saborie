<template>
  <view class="container">
    <navigation />
  </view>
</template>

<script>
import Vue from 'vue-native-core'
import { VueNativeBase } from 'native-base'

import store from './store'
import Navigation from './navigation'
import Vuelidate from 'vuelidate'

import ScreenWithDrawer from '@/components/ScreenWithDrawer'
import InputWithError from '@/components/InputWithError'
import AppMessage from '@/components/AppMessage'

// プラグインの登録
Vue.use(VueNativeBase)
Vue.use(Vuelidate)

// コンポーネントの登録
Vue.component('ScreenWithDrawer', ScreenWithDrawer)
Vue.component('AppMessage', AppMessage)
Vue.component('InputWithError', InputWithError)

// vuex storeをvueのグローバルコンテキストに追加
Vue.prototype.$store = store

export default {
  components: {
    Navigation
  }
}
</script>

<style>
  .container {
    flex: 1;
  }
</style>
