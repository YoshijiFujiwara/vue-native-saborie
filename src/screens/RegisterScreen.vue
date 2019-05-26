<template>
  <nb-container :style="{backgroundColor: '#fff'}">
    <nb-header>
      <nb-body>
        <nb-title>
          登録
        </nb-title>
      </nb-body>
    </nb-header>
    <nb-content padder>
      <nb-form>
        <nb-item>
          <nb-input
            v-model="form.username"
            placeholder="ユーザー名"
            auto-capitalize="none"
          />
        </nb-item>
        <nb-item>
          <nb-input
            v-model="form.email"
            placeholder="メールアドレス"
            auto-capitalize="none"
          />
        </nb-item>
        <nb-item>
          <nb-input
            v-model="form.password"
            placeholder="パスワード"
            auto-capitalize="none"
            secure-text-entry
          />
        </nb-item>
        <nb-item>
          <nb-input
            v-model="form.passwordConfirmation"
            last
            placeholder="パスワード(再入力)"
            auto-capitalize="none"
          />
        </nb-item>
      </nb-form>
      <view :style="{marginTop:10}">
        <nb-button :on-press="register" block>
          <nb-text>登録</nb-text>
        </nb-button>
        <nb-button
          :on-press="goToLogin"
          transparent
        >
          <nb-text>アカウントをお持ちですか？ここからログインできますよー</nb-text>
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
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    register () {
      alert(JSON.stringify(this.form))
    },
    goToLogin () {
      this.navigation.navigate('Login')
    }
  }
}
</script>

