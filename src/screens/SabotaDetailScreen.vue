<template>
  <view>
    <text>詳細画面</text>
    <text>{{sabota.body}}</text>
  </view>
</template>

<script>
export default {
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
