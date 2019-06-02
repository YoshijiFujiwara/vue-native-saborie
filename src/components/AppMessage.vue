<template>
  <view :style="{padding: 20, marginHorizontal: 5, marginVertical: 5, backgroundColor: bgColor}">
    <text :style="[styles.textGray, {fontSize: 16}]">
      {{ message }}
    </text>
  </view>
</template>

<script>

import { ACCENT_COLOR, PRIMARY_COLOR } from '../styles/colors'
import styles from '@/styles'

export default {
  props: {
    message: {
      type: String,
      required: true
    },
    msgType: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      styles
    }
  },
  computed: {
    bgColor () {
      switch (this.msgType) {
        case 'primary':
          return PRIMARY_COLOR
        case 'info':
          return ACCENT_COLOR
        case 'warning':
          return '#ffffb5'
        case 'danger':
          return '#e44985'
        default:
          return 'white'
      }
    }
  }
}
</script>
