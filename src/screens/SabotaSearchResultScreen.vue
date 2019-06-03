<template>
  <nb-container :style="styles.bgWhite">
    <app-header
      :navigation="navigation"
      screen="サボタ検索結果"
    />
    <nb-content>
      <scroll-view>
        <nb-text
          class="header-1"
          :style="styles.textGray"
        >
          検索結果
        </nb-text>
        <sabota-card
          v-for="sabota in searchSabotas"
          :key="sabota.id"
          :sabota="sabota"
          :auth-user="user"
          :navigate-to-detail="goToSabotaDetail"
          :navigate-to-edit="goToSabotaEdit"
        />
      </scroll-view>
    </nb-content>
  </nb-container>
</template>

<script>
import SabotaCard from '@/components/SabotaCard'
import { AsyncStorage } from 'react-native'
import styles from '@/styles'

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
      styles,
      title: 'Home Screen'
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    searchSabotas () {
      return this.$store.state.searchSabotas.items
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    // inputCommentがtrueなら、コメントのところに、フォーカスした状態で始めたいですね
    goToSabotaDetail (sabotaId, focusComment = false) {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId, focusComment })
    },
    goToSabotaEdit (sabotaId) {
      this.navigation.navigate('SabotaEdit', { sabotaId })
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
