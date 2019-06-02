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
        screen="サボタの投稿"
        root
      />
      <!-- ログインしていれば表示する -->
      <nb-content
        v-if="user"
        :style="{paddingHorizontal: 10, paddingTop: 10}"
      >
        <view :style="styles.container">
          <nb-text :style="[styles.textGray, styles.headerOne]">
            サボったことを正直に書こう！
          </nb-text>
        </view>

        <nb-form>
          <input-with-error
            :error="$v.form.shouldDone.$dirty && (!$v.form.shouldDone.required || !$v.form.shouldDone.maxLength)"
            message="1〜30文字で入力してください"
            :stacked-label="true"
            :no-margin="true"
          >
            <nb-label :style="styles.textShouldDone">
              サボったこと
            </nb-label>
            <nb-input
              v-model="form.shouldDone"
              :style="styles.textShouldDone"
            />
          </input-with-error>
          <input-with-error
            :error="$v.form.mistake.$dirty && (!$v.form.mistake.required || !$v.form.mistake.maxLength)"
            message="1〜30文字で入力してください"
            :stacked-label="true"
            :no-margin="true"
          >
            <nb-label :style="styles.textMistake">
              やっちゃったこと
            </nb-label>
            <nb-input
              v-model="form.mistake"
              :style="styles.textMistake"
            />
          </input-with-error>
          <input-with-error
            :error="$v.form.time.$dirty && !$v.form.time.between"
            message="0分以外を選んでください"
            :stacked-label="true"
            :no-margin="true"
          >
            <nb-label
              :style="styles.textTime"
            >
              どのくらい？
            </nb-label>
            <app-time-picker
              where="create"
              :on-value-change="(time) => setTime(time)"
            />
          </input-with-error>
          <input-with-error
            :error="$v.form.body.$dirty && !$v.form.body.maxLength"
            message="言い訳は100文字以内で書いてください"
            :stacked-label="true"
            :no-margin="true"
          >
            <nb-label :style="styles.textExcuse">
              いいわけ(書かなくてもOK)
            </nb-label>
            <nb-textarea
              v-model="form.body"
              :row-span="3"
              :style="[{width: '100%'}, styles.textExcuse]"
              bordered
            />
          </input-with-error>
          <view :style="{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10}">
            <nb-button
              :style="[styles.bgPrimary, {width: wp('65%')}]"
              :on-press="createSabota"
              block
            >
              <nb-text>サボタを作成</nb-text>
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
        </nb-form>
      </nb-content>
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
import { required, between, maxLength } from 'vuelidate/lib/validators'
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
        shouldDone: '',
        mistake: '',
        time: 0,
        body: ''
      }
    }
  },
  validations: {
    form: {
      shouldDone: {
        required,
        maxLength: maxLength(30)
      },
      mistake: {
        required,
        maxLength: maxLength(30)
      },
      time: {
        between: between(1, 25 * 60)
      },
      body: {
        maxLength: maxLength(100)
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    allEmpty () {
      return this.form.keyWord === '' && this.form.shouldDone === '' && this.form.mistake === '' && this.form.time === 0 && this.form.body === ''
    }
  },
  methods: {
    createSabota () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$store.dispatch('sabotas/createSabota', this.form)
          .then((createSabota) => this.navigation.navigate('SabotaDetail', { sabotaId: createSabota.id }))
      }
    },
    setTime (time) {
      this.form.time = time
    },
    goToRegister () {
      this.navigation.navigate('Register')
    },
    goToLogin () {
      this.navigation.navigate('Login')
    },
    resetForm () {
      this.form.keyWord = ''
      this.form.shouldDone = ''
      this.form.mistake = ''
      this.form.body = ''

      // timeだけ別だね
      this.$store.dispatch('selectedTime/changeCreateTime', '')
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
