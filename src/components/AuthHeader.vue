<template>
  <nb-header :style="styles.noBorderHeader">
    <nb-body>
      <nb-title :style="styles.textGray">
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
