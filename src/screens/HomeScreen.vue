<template>
  <nb-container :style="styles.bgWhite">
    <app-header
      root
      :navigation="navigation"
      screen="サボタ一覧"
    />
    <nb-content>
      <scroll-view>
        <nb-text
          class="header-1"
          :style="styles.textGray"
        >
          最新のサボタ
        </nb-text>
        <sabota-card
          v-for="sabota in sabotas"
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
    sabotas () {
      return this.$store.state.sabotas.items
      // return [{ 'id': 302, 'shouldDone': 'qqqq', 'mistake': 'qqqq', 'time': 150, 'body': 'ほげほげほげほｇへおｈごえｈごえｈごえほげほｇへおｇへおｈごえｈごえｈごえほげほｇへおｇへおｈごえｈ', 'created_at': '2019-05-29 09:56:17', 'updated_at': '2019-05-29 09:56:17', 'postUser': { 'id': 296, 'username': 'newnew', 'email': '', 'password': '', 'created_at': '', 'updated_at': '', 'jwt': { 'token': '' }}, 'metooUserIds': null, 'loveUserIds': null, 'commentUserIds': null, 'comments': null }, { 'id': 301, 'shouldDone': 'sssssssssssssss', 'mistake': 'sssssssssssss', 'time': 180, 'body': '', 'created_at': '2019-05-29 09:55:02', 'updated_at': '2019-05-29 09:55:02', 'postUser': { 'id': 296, 'username': 'newnew', 'email': '', 'password': '', 'created_at': '', 'updated_at': '', 'jwt': { 'token': '' }}, 'metooUserIds': null, 'loveUserIds': null, 'commentUserIds': null, 'comments': null }, { 'id': 300, 'shouldDone': 'sssssssssssssss', 'mistake': 'sssssssssssss', 'time': 180, 'body': 'sssssssssss', 'created_at': '2019-05-29 09:54:59', 'updated_at': '2019-05-29 09:54:59', 'postUser': { 'id': 296, 'username': 'newnew', 'email': '', 'password': '', 'created_at': '', 'updated_at': '', 'jwt': { 'token': '' }}, 'metooUserIds': null, 'loveUserIds': null, 'commentUserIds': null, 'comments': null }, { 'id': 297, 'shouldDone': 'sssssssssssssss', 'mistake': 'sssssssssssss', 'time': 180, 'body': 'sssssssssss', 'created_at': '2019-05-29 09:54:26', 'updated_at': '2019-05-29 09:54:26', 'postUser': { 'id': 296, 'username': 'newnew', 'email': '', 'password': '', 'created_at': '', 'updated_at': '', 'jwt': { 'token': '' }}, 'metooUserIds': null, 'loveUserIds': null, 'commentUserIds': null, 'comments': null }, { 'id': 260, 'shouldDone': 'sigoto', 'mistake': 'youtube', 'time': 180, 'body': 'aaa', 'created_at': '2019-06-01 15:39:08', 'updated_at': '2019-06-01 15:39:08', 'postUser': { 'id': 296, 'username': 'newnew', 'email': '', 'password': '', 'created_at': '', 'updated_at': '', 'jwt': { 'token': '' }}, 'metooUserIds': null, 'loveUserIds': null, 'commentUserIds': [296, 296], 'comments': null }]
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  created () {
    this.$store.dispatch('sabotas/fetchSabotas') // モジュール化したので、sabotas/が必要
  },
  methods: {
    // inputCommentがtrueなら、コメントのところに、フォーカスした状態で始めたいですね
    goToSabotaDetail (sabotaId, focusComment = false) {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId, focusComment })
    },
    goToSabotaEdit (sabotaId) {
      this.navigation.navigate('SabotaEdit')
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
