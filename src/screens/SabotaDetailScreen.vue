<template>
  <nb-container>
    <SabotaCard
      :sabota="sabota"
    />
    <nb-content>
      <nb-card v-for="comment in sabota.comments" :key="comment.id">
        <nb-card-item bordered>
          <nb-body>
            <nb-text>
              {{comment.body}}
            </nb-text>
            <nb-text>
              {{comment.postUser.username}}
            </nb-text>
          </nb-body>
        </nb-card-item>
      </nb-card>
    </nb-content>
  </nb-container>
</template>

<script>
import styles from '@/styles'
import SabotaCard from '@/components/SabotaCard'

export default {
  components: {
    SabotaCard
  },
  data () {
    return {
      styles
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    sabota () {
      return this.$store.state.sabotas.item
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
