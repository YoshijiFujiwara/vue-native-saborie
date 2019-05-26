<template>
  <nb-container :style="{backgroundColor: '#fff'}">
    <nb-header>
      <nb-body>
        <nb-title>
          ログイン
        </nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <nb-item>
          <nb-input
            v-model="form.email"
            placeholder="メールアドレス"
            auto-capitalize="none"
          />
        </nb-item>
        <nb-item last>
          <nb-input
            v-model="form.password"
            placeholder="パスワード"
            auto-capitalize="none"
            secure-text-entry
          />
        </nb-item>
      </nb-form>
      <view :style="{marginTop:10}">
        <nb-button
          block
          :on-press="login"
        >
          <nb-text>ログイン </nb-text>
        </nb-button>
        <nb-button
          :on-press="goToRegister"
          transparent
        >
          <nb-text>登録がまだですか？</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      alert(`${this.email}, ${this.password}`)
    },
    goToRegister () {
      this.navigation.navigate('Register')
    }
  }
}
</script>
