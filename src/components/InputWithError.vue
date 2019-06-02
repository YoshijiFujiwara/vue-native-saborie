<template>
  <view>
    <nb-item
      :stacked-label="stackedLabel"
      :class="noMargin"
    >
      <slot />
    </nb-item>
    <nb-text
      v-if="error"
      :style="{color: 'red', padding: 10, fontSize: 14}"
    >
      {{ message }}
    </nb-text>
  </view>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: 'エラー'
    },
    stackedLabel: {
      type: Boolean,
      default: false
    },
    noMargin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
