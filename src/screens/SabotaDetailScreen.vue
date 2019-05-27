<template>
  <nb-container v-if="isSabotaLoaded">
    <app-header
      screen="サボタ詳細"
      :navigation="navigation"
    />
    <sabota-card
      :sabota="sabota"
    />
    <nb-content v-if="sabota.comments && sabota.comments.length > 0">
      <comment-card
        v-for="comment in sabota.comments"
        :key="comment.id"
        :comment="comment"
      />
    </nb-content>
    <nb-content v-else>
      <app-message
        message="コメントはありません"
        msg-type="warning"
      />
    </nb-content>
  </nb-container>
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
