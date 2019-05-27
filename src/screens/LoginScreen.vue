<template>
  <!--  <nb-container-->
  <!--    v-if="isCheckingUser"-->
  <!--    class="spinner-container"-->
  <!--  >-->
  <!--    <nb-spinner color="blue " />-->
  <!--  </nb-container>-->
  <nb-container
    :style="{backgroundColor: '#fff'}"
  >
    <app-navigation-events :on-did-focus="checkForMessage" />
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
        <nb-button
          :on-press="goToHome"
          transparent
        >
          <nb-text>ログインせずに続ける</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { Toast } from 'native-base'
// import { AsyncStorage } from 'react-native'

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      isCheckingUser: false,
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
  async created () {
    const isAuth = this.$store.getters['auth/isAuth']
    if (isAuth) {
      this.navigation.navigate('Home')
    }
  },
  methods: {
    login () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$store.dispatch('auth/login', this.form)
          .then(user => {
            this.navigation.navigate('Home')
          })
          .catch(() => {
            Toast.show({
              text: 'メールアドレスまたはパスワードが正しくありません',
              buttonText: 'Ok',
              type: 'danger',
              position: 'top',
              duration: 3000
            })
          })
      }
    },
    checkForMessage () {
      const message = this.navigation.getParam('message')
      if (message) {
        Toast.show({
          text: message,
          buttonText: 'Ok',
          type: 'success',
          position: 'top',
          duration: 3000
        })
      }
    },
    goToRegister () {
      this.navigation.navigate('Register')
    },
    goToHome () {
      this.navigation.navigate('Home')
    }
  }
}
</script>

<style>

</style>
