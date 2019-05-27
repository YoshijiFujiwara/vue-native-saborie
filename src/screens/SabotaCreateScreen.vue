<template>
  <!-- キーボードで、入力欄が隠れないようにする -->
  <keyboard-avoiding-view
    :style="{flex: 1}"
    behavior="padding"
    keyboard-vertical-offset="30"
    enabled
  >
    <nb-container>
      <!-- Provide Navigation to App Header -->
      <app-header :navigation="navigation" />
      <!-- Provide Styles Here -->
      <view :style="styles.container">
        <nb-text :style="styles.headerOne">
          新しいサボタ
        </nb-text>
      </view>
      <nb-content>
        <nb-form>
          <nb-item stacked-label>
            <nb-label>サボったこと</nb-label>
            <nb-input />
          </nb-item>
          <nb-item stacked-label>
            <nb-label>やっちゃったこと</nb-label>
            <nb-input />
          </nb-item>
          <nb-item stacked-label>
            <nb-label>どのくらい？</nb-label>
            <nb-input />
          </nb-item>
          <nb-item stacked-label>
            <nb-label>説明</nb-label>
            <nb-input />
          </nb-item>
        </nb-form>
      </nb-content>
    </nb-container>
  </keyboard-avoiding-view>
</template>

<script>
import { KeyboardAvoidingView } from 'react-native'
import styles from '@/styles'

export default {
  components: {
    KeyboardAvoidingView
  },
  props: {
    navigation: {
      type: Object
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
