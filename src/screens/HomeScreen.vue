<template>
  <nb-container>
    <app-header
      root
      :navigation="navigation"
      screen="ホーム"
    />
    <scroll-view>
      <nb-text class="header-1">
        最新のサボタ
      </nb-text>
      <nb-text v-if="user">
        ようこそ {{ user.username }}さん
      </nb-text>
      <nb-button
        :on-press="logout"
        transparent
      >
        <nb-text>ログアウト</nb-text>
      </nb-button>
      <!-- Iterate meetups "v-for"  -->
      <sabota-card
        v-for="sabota in sabotas"
        :key="sabota.id"
        :sabota="sabota"
        :navigate-to-detail="goToMeetupDetail"
      />
    </scroll-view>
  </nb-container>
</template>

<script>
import SabotaCard from '@/components/SabotaCard'
import { AsyncStorage } from 'react-native'

export default {
  components: {
    SabotaCard
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      title: 'Home Screen'
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    sabotas () {
      return this.$store.state.sabotas.items
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  created () {
    this.$store.dispatch('sabotas/fetchSabotas') // モジュール化したので、sabotas/が必要
    this.$store.dispatch('sabotas/createSabota') // todo テストなので消す
  },
  methods: {
    goToScreen1 () {
      this.navigation.navigate('ScreenOne')
    },
    goToMeetupDetail (sabotaId) {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId })
    },
    logout () {
      AsyncStorage.removeItem('saborie-jwt')
    }
  }
}
</script>

<style>
  .header-1 {
    font-size: 23px;
    padding: 20px;
    font-weight: bold;
  }
</style>
