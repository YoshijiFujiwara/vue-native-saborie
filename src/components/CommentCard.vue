<template>
  <nb-card transparent>
    <nb-card-item bordered>
      <nb-body>
        <nb-text :style="styles.textGray">
          {{ comment.body }}
        </nb-text>
        <!--        <nb-text>-->
        <!--          {{ comment.postUser.username }}-->
        <!--        </nb-text>-->
      </nb-body>
    </nb-card-item>
  </nb-card>
</template>

<script>
import styles from '@/styles'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      styles
    }
  }
}
</script>

<style>

</style>
