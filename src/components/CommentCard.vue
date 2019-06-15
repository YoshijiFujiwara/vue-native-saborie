<template>
  <nb-card transparent>
    <nb-card-item bordered>
      <nb-body :style="{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}">
        <nb-text :style="[styles.textGray, {maxWidth: wp('70%')}]">
          {{ comment.body }}
        </nb-text>
        <nb-text :style="{maxWidth: wp('18%')}">
          {{ comment.postUser.username }}さん
        </nb-text>
      </nb-body>
    </nb-card-item>
  </nb-card>
</template>

<script>
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen'
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
      wp,
      hp,
      loc,
      rol,
      styles
    }
  }
}
</script>

<style>

</style>
