<template>
  <nb-header :style="styles.bgPrimary">
    <nb-body>
      <nb-title>
        {{ screen }}
      </nb-title>
    </nb-body>
  </nb-header>
</template>

<script>
import styles from '@/styles'

export default {
  props: {
    screen: {
      type: String,
      default: 'ヘッダー'
    }
  },
  data () {
    return {
      styles
    }
  }
}
</script>
