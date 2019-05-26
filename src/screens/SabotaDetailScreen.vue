<template>
  <NbContainer v-if="isSabotaLoaded">
    <SabotaCard
      :sabota="sabota"
    />
    <NbContent v-if="sabota.comments && sabota.comments.length > 0">
      <CommentCard
        v-for="comment in sabota.comments"
        :key="comment.id"
        :comment="comment"
      />
    </NbContent>
    <NbContent v-else>
      <AppMessage message="コメントはありません" msgType="warning" />
    </NbContent>
  </NbContainer>
</template>

<script>
import styles from '@/styles'
import SabotaCard from '@/components/SabotaCard'
import CommentCard from '@/components/CommentCard'

export default {
  components: {
    SabotaCard,
    CommentCard
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      styles
    }
  },
  computed: {
    sabota () {
      return this.$store.state.sabotas.item
    },
    isSabotaLoaded () {
      return Object.keys(this.sabota).length > 0
    }
  },
  created () {
    // ナビゲーションするときに、sabotaIdをもらう
    const sabotaId = this.navigation.getParam('sabotaId', 'undefined')
    // sabotaの詳細情報を取得
    this.$store.dispatch('sabotas/fetchSabotaById', sabotaId)
  }
}
</script>

<style>
</style>
