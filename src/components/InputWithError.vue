<template>
  <view>
    <nb-item>
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
  props: ['error', 'message']
}
</script>

<style>

</style>
