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
      btnOptions: ['ログイン', 'アカウント登録', '設定', 'ログアウト', 'キャンセル'],
      clicked: 0
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
        buttonIndex => {
          this.clicked = this.btnOptions[buttonIndex]
          alert(`${this.clicked} clicked`)
        }
      )
    }
  }
}
</script>
