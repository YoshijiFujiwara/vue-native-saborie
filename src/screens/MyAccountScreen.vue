<template>
  <nb-container>
    <app-header
      root
      :navigation="navigation"
      screen="マイアカウント"
    />
    <nb-content>
      <nb-tabs >
        <nb-tab heading="やっちゃった">
          <mistake-result />
        </nb-tab>
        <nb-tab heading="やるべきだった">
          <should-done-result />
        </nb-tab>
      </nb-tabs>
    </nb-content>
  </nb-container>
</template>

<script>
import MistakeResult from '@/components/MistakeResult'
import ShouldDoneResult from '@/components/ShouldDoneResult'

export default {
  components: {
    MistakeResult,
    ShouldDoneResult
  },
  props: {
    navigation: {
      type: Object
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
