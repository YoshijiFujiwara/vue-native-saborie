<template>
  <ScrollView>
    <NbText class="header-1">
      最新のサボタ
    </NbText>
    <!-- Iterate meetups "v-for"  -->
    <SabotaCard
      v-for="sabota in sabotas"
      :key="sabota.id"
      :sabota="sabota"
      :navigate-to-detail="goToMeetupDetail"
    />
  </ScrollView>
</template>

<script>
import SabotaCard from '@/components/SabotaCard'

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
    }
  },
  created () {
    this.$store.dispatch('fetchTodos')
    this.$store.dispatch('sabotas/fetchSabotas') // モジュール化したので、sabotas/が必要
  },
  methods: {
    goToScreen1 () {
      this.navigation.navigate('ScreenOne')
    },
    goToMeetupDetail () {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId: 'Some unique ID!' })
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
