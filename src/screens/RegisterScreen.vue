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
        <input-with-error
          :error="$v.form.username.$dirty && !$v.form.username.minLength"
          message="ユーザー名は5文字以上で入力してください"
        >
          <nb-input
            v-model="form.username"
            placeholder="ユーザー名"
            auto-capitalize="none"
            :on-blur="() => $v.form.username.$touch()"
          />
        </input-with-error>
        <input-with-error
          :error="$v.form.email.$dirty && !$v.form.email.isValidEmail"
          message="形式が正しくありません"
        >
          <nb-input
            v-model="form.email"
            placeholder="メールアドレス"
            auto-capitalize="none"
            :on-blur="() => $v.form.email.$touch()"
          />
        </input-with-error>
        <input-with-error
          :error="$v.form.password.$dirty && !$v.form.password.required"
          message="パスワードは必須です"
        >
          <nb-input
            v-model="form.password"
            placeholder="パスワード"
            auto-capitalize="none"
            secure-text-entry
            :on-blur="() => $v.form.password.$touch()"
          />
        </input-with-error>
        <input-with-error
          :error="$v.form.passwordConfirmation.$dirty && !$v.form.passwordConfirmation.sameAsPassword"
          message="パスワードが一致していません"
        >
          <nb-input
            v-model="form.passwordConfirmation"
            last
            placeholder="パスワード(確認)"
            auto-capitalize="none"
            secure-text-entry
            :on-blur="() => $v.form.passwordConfirmation.$touch()"
          />
        </input-with-error>
      </nb-form>
      <view :style="{marginTop:10}">
        <nb-button
          :on-press="register"
          block
        >
          <nb-text>登録</nb-text>
        </nb-button>
        <nb-button
          :on-press="goToLogin"
          transparent
        >
          <nb-text>アカウントをお持ちですか？ここからログインできますよー</nb-text>
        </nb-button>
        <nb-button
          :on-press="sendMessageToLogin"
          transparent
        >
          <nb-text>メッセージ送信</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { Toast } from 'native-base'

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
  validations: {
    form: {
      username: {
        minLength: minLength(5)
      },
      email: {
        isValidEmail: email
      },
      password: {
        required
      },
      passwordConfirmation: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    register () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$store.dispatch('auth/register', this.form)
          .then(() => this.navigation.navigate('Login'))
          .catch(() => {
            Toast.show({
              text: '登録できませんでした',
              buttonText: 'Ok',
              type: 'danger',
              position: 'top',
              duration: 3000
            })
          })
      }
    },
    goToLogin () {
      this.navigation.navigate('Login')
    },
    sendMessageToLogin () {
      this.navigation.navigate('Login', { message: 'ユーザー登録が完了しました。ログインできます。' })
    }
  }
}
</script>

