<template>
  <nb-card>
    <nb-card-item bordered>
      <nb-left>
        <nb-body>
          <nb-text>{{sabota.shouldDone}}をさぼって、{{sabota.mistake}}を{{sabota.time}}分やっちゃった！！</nb-text>
        </nb-body>
      </nb-left>
    </nb-card-item>
    <nb-card-item>
      <nb-body>
        <nb-text>{{sabota.body}}</nb-text>
      </nb-body>
    </nb-card-item>
    <nb-card-item :style="{ paddingVertical: 0 }">
      <nb-left>
        <nb-button transparent>
          <nb-icon name="md-rocket"></nb-icon>
          <nb-text>{{sabota.numberOfMetoo}}</nb-text>
        </nb-button>
        <nb-button transparent>
          <nb-icon name="heart"></nb-icon>
          <nb-text>{{sabota.numberOfLove}}</nb-text>
        </nb-button>
      </nb-left>
    </nb-card-item>
  </nb-card>
</template>

<script>
export default {
  props: {
    sabota: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>