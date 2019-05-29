<template>
  <!-- キーボードで、入力欄が隠れないようにする -->
  <keyboard-avoiding-view
    class="keyboard-container"
    :style="{flex: 1}"
    behavior="padding"
    keyboard-vertical-offset="30"
    enabled
  >
    <nb-container>
      <app-header
        :navigation="navigation"
        screen="サボタの投稿"
        root
      />
      <!-- ログインしていれば表示する -->
      <view v-if="user">
        <view :style="styles.container">
          <nb-text :style="styles.headerOne">
            新しいサボタ
          </nb-text>
        </view>

        <nb-form>
          <nb-item
            stacked-label
            class="no-margin"
          >
            <nb-label>サボったこと</nb-label>
            <nb-input v-model="form.shouldDone" />
          </nb-item>
          <nb-item
            stacked-label
            class="no-margin"
          >
            <nb-label>やっちゃったこと</nb-label>
            <nb-input v-model="form.mistake" />
          </nb-item>
          <nb-item
            stacked-label
            class="no-margin"
          >
            <nb-label>どのくらい？</nb-label>
            <app-time-picker :on-value-change="(time) => setTime(time)" />
          </nb-item>
          <nb-item
            stacked-label
            class="no-margin"
          >
            <nb-label>説明</nb-label>
            <nb-textarea
              v-model="form.body"
              :row-span="3"
              :style="{width: '100%'}"
              bordered
            />
          </nb-item>
          <nb-button
            :on-press="createSabota"
            block
          >
            <nb-text>サボタを作成</nb-text>
          </nb-button>
        </nb-form>
      </view>
      <!-- ログインしてない -->
      <view v-else>
        <nb-text class="header-2">
          ログインすると、サボタを投稿できます！
        </nb-text>
        <nb-button
          :on-press="goToLogin"
          transparent
        >
          <nb-text>アカウントをお持ちの方はこちら</nb-text>
        </nb-button>
        <nb-button
          :on-press="goToRegister"
          transparent
        >
          <nb-text>登録がまだの方はこちら</nb-text>
        </nb-button>
      </view>
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
      styles,
      form: {
        shouldDone: '',
        mistake: '',
        time: 0,
        body: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    createSabota () {
      this.$store.dispatch('sabotas/createSabota', this.form)
        .then((createSabota) => this.navigation.navigate('SabotaDetail', { sabotaId: createSabota.id }))
    },
    setTime (time) {
      this.form.time = time
    },
    goToRegister () {
      this.navigation.navigate('Register')
    },
    goToLogin () {
      this.navigation.navigate('Login')
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

  .header-2 {
    font-size: 20px;
    padding: 20px;
    font-weight: bold;
  }
</style>
