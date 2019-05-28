<template>
  <nb-container>
    <app-header
      root
      :navigation="navigation"
      screen="サボタ一覧"
    />
    <scroll-view>
      <nb-text class="header-1">
        最新のサボタ
      </nb-text>
      <nb-text v-if="user">
        ようこそ {{ user.username }}{{ user.id }}さん
      </nb-text>
      <sabota-card
        v-for="sabota in sabotas"
        :key="sabota.id"
        :sabota="sabota"
        :auth-user="user"
        :navigate-to-detail="goToMeetupDetail"
        :show-login-alert="showLoginAlert"
        :show-your-post-alert="showYourPostAlert"
      />
    </scroll-view>
  </nb-container>
</template>

<script>
import SabotaCard from '@/components/SabotaCard'
import { AsyncStorage } from 'react-native'
import { Toast } from 'native-base'

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
  },
  methods: {
    goToMeetupDetail (sabotaId) {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId })
    },
    logout () {
      AsyncStorage.removeItem('saborie-jwt')
    },
    showLoginAlert () { // ログインが必要なところをタップしとき、alertを表示する
      Toast.show({
        text: 'ログインが必要です',
        buttonText: 'Ok',
        type: 'warning',
        position: 'top',
        duration: 3000
      })
    },
    showYourPostAlert () {
      Toast.show({
        text: '自分の投稿にはアクションできません',
        buttonText: 'Ok',
        type: 'warning',
        position: 'top',
        duration: 3000
      })
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
