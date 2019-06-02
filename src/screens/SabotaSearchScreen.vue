<template>
  <!-- キーボードで、入力欄が隠れないようにする -->
  <keyboard-avoiding-view
    class="keyboard-container"
    :style="{flex: 1}"
    behavior="padding"
    keyboard-vertical-offset="30"
    enabled
  >
    <nb-container :style="styles.bgWhite">
      <app-header
        :navigation="navigation"
        screen="サボタを検索"
        root
      />
      <nb-form :style="{paddingHorizontal: 10, paddingTop: 10}">
        <nb-item rounded>
          <nb-input
            v-model="form.keyWord"
            :style="styles.textGray"
            placeholder="キーワード"
          />
        </nb-item>
        <nb-item
          stacked-label
          class="no-margin"
        >
          <nb-label :style="styles.textShouldDone">
            サボったこと
          </nb-label>
          <nb-input
            v-model="form.shouldDone"
            :style="styles.textShouldDone"
          />
        </nb-item>
        <nb-item
          stacked-label
          class="no-margin"
        >
          <nb-label :style="styles.textMistake">
            やっちゃったこと
          </nb-label>
          <nb-input
            v-model="form.mistake"
            :style="styles.textMistake"
          />
        </nb-item>
        <nb-item
          stacked-label
          class="no-margin"
        >
          <nb-label :style="styles.textTime">
            どのくらい？
          </nb-label>
          <app-time-picker
            where="search"
            :on-value-change="(time) => setTime(time)"
          />
        </nb-item>
        <nb-item
          stacked-label
          class="no-margin"
        >
          <nb-label :style="styles.textExcuse">
            いいわけ
          </nb-label>
          <nb-input
            v-model="form.body"
            :style="styles.textExcuse"
          />
        </nb-item>
        <view :style="{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10}">
          <nb-button
            v-if="!allEmpty"
            :style="[styles.bgPrimary, {width: wp('65%')}]"
            :on-press="searchSabota"
            block
          >
            <nb-text>サボタを検索</nb-text>
          </nb-button>
          <nb-button
            v-if="!allEmpty"
            :style="[styles.bgWarning, {width: wp('25%'), marginLeft: 3}]"
            :on-press="resetForm"
            block
          >
            <nb-text>リセット</nb-text>
          </nb-button>
        </view>
        <view :style="{marginTop: 33}" v-if="showResult && (!searchSabotas || searchSabotas.length === 0)">
          <nb-text
            class="header-1"
            :style="styles.textGray"
          >
            サボタが見つかりませんでした
          </nb-text>
        </view>
      </nb-form>
    </nb-container>
  </keyboard-avoiding-view>
</template>

<script>
import { KeyboardAvoidingView } from 'react-native'
import styles from '@/styles'
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'

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
      wp,
      styles,
      form: {
        keyWord: '',
        shouldDone: '',
        mistake: '',
        time: 0,
        body: ''
      },
      showResult: false
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    allEmpty () {
      return this.form.keyWord === '' && this.form.shouldDone === '' && this.form.mistake === '' && this.form.time === 0 && this.form.body === ''
    },
    searchSabotas () {
      return this.$store.state.searchSabotas.items
    }
  },
  methods: {
    setTime (time) {
      this.form.time = time
    },
    searchSabota () {
      // 検索
      this.$store.dispatch('searchSabotas/searchSabotas', this.form)
        .then(res => {
          this.showResult = true
          if (this.searchSabotas && this.searchSabotas.length > 0) {
            this.navigation.navigate('SabotaSearchResult')
          }
        })
    },
    // inputCommentがtrueなら、コメントのところに、フォーカスした状態で始めたいですね
    goToSabotaDetail (sabotaId, focusComment = false) {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId, focusComment })
    },
    resetForm () {
      this.form.keyWord = ''
      this.form.shouldDone = ''
      this.form.mistake = ''
      this.form.body = ''

      // timeだけ別だね
      this.$store.dispatch('selectedTime/changeSearchTime', '')
    }
  }
}
</script>

<style>
  .no-margin {
    margin-left: 0;
  }

  .keyboard-container {
    padding: 0 10px;
  }

  .header-1 {
    font-size: 23px;
    padding: 20px;
    font-weight: bold;
  }

  .header-2 {
    font-size: 20px;
    padding: 20px;
    font-weight: bold;
  }
</style>
