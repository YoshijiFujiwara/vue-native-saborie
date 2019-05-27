<template>
  <nb-header>
    <nb-left>
      <!--   ルートなら表示しなくていいよね   -->
      <nb-button
        v-if="!root"
        :on-press="goBack"
        transparent
      >
        <nb-icon name="arrow-back" />
      </nb-button>
    </nb-left>
    <nb-body>
      <nb-title>{{ screen }}</nb-title>
    </nb-body>
    <nb-right>
      <nb-button :on-press="displayActionSheet" transparent>
        <nb-icon name="menu" />
      </nb-button>
    </nb-right>
  </nb-header>
</template>

<script>
import { ActionSheet } from 'native-base'

export default {
  props: {
    screen: {
      type: String,
      default: 'ヘッダー'
    },
    root: {
      type: Boolean
    },
    navigation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      btnOptions: ['ログイン', 'アカウント登録', 'ログアウト', 'キャンセル']
    }
  },
  methods: {
    goBack () {
      this.navigation.goBack()
    },
    computed: {
      optionCancelIndex () {
        // キャンセルボタンは最後でしょう
        return this.btnOptions.length - 1
      },
      optionDestructiveIndex () {
        // 上記の１個前
        return this.optionCancelIndex - 1
      }
    },
    displayActionSheet () {
      ActionSheet.show(
        {
          options: this.btnOptions,
          cancelButtonIndex: this.optionCancelIndex,
          destructiveButtonIndex: this.optionDestructiveIndex
          // titleはイランかな
        },
        this.handleOptionSelect
      )
    },
    handleOptionSelect (buttonIndex) {
      const option = this.btnOptions[buttonIndex]

      // 押されたボタンによって分岐
      switch (option) {
        case 'ログイン':
          this.navigation.navigate('Login')
          break
        case 'アカウント登録':
          this.navigation.navigate('Register')
          break
        case 'ログアウト':
          alert('ログアウト')
          break
        default:
          return null
      }
    }
  }
}
</script>
