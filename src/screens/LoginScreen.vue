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
            :on-blur="() => $v.form.email.$touch()"
          />
        </nb-item>
        <nb-text
          v-if="$v.form.email.$dirty && !$v.form.email.required"
          :style="{color: 'red', padding: 10, fontSize: 14}"
        >
          メールアドレスは必須です
        </nb-text>
        <nb-item last>
          <nb-input
            v-model="form.password"
            placeholder="パスワード"
            auto-capitalize="none"
            secure-text-entry
            :on-blur="() => $v.form.email.$touch()"
          />
        </nb-item>
        <nb-text
          v-if="$v.form.email.$dirty && !$v.form.email.required"
          :style="{color: 'red', padding: 10, fontSize: 14}"
        >
          パスワードは必須です
        </nb-text>
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
