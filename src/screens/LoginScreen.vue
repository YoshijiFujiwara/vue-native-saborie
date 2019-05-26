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
        <input-with-error
          :error="$v.form.email.$dirty && !$v.form.email.required"
          message="メールアドレスは必須です"
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
          last
        >
          <nb-input
            v-model="form.password"
            placeholder="パスワード"
            auto-capitalize="none"
            secure-text-entry
            :on-blur="() => $v.form.email.$touch()"
          />
        </input-with-error>
      </nb-form>
      <view :style="{marginTop:10}">
        <nb-button
          block
          :on-press="login"
        >
          <nb-text>ログイン</nb-text>
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
import { required } from 'vuelidate/lib/validators'

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
  validations: {
    form: {
      email: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    login () {
      this.$v.form.$touch()
    },
    goToRegister () {
      this.navigation.navigate('Register')
    }
  }
}
</script>
