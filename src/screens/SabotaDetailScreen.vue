<template>
  <view>
    <text>詳細画面</text>
    <text>{{sabotaId}}</text>
  </view>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      sabotaId: ''
    }
  },
  created () {
    // ナビゲーションするときに、sabotaIdをもらう
    this.sabotaId = this.navigation.getParam('sabotaId', 'undefined')
  }
}
</script>

<style>

</style>
