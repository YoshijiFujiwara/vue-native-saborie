<template>
  <NbContainer :style="{backgroundColor: '#fff'}">
    <NbHeader>
      <NbBody>
        <NbTitle>
          ログイン
        </NbTitle>
      </NbBody>
    </NbHeader>
    <NbContent padder>
      <NbForm>
        <NbItem>
          <NbInput
            v-model="form.email"
            placeholder="メールアドレス"
            auto-capitalize="none"
          />
        </NbItem>
        <NbItem last>
          <NbInput
            v-model="form.password"
            placeholder="パスワード"
            auto-capitalize="none"
            secure-text-entry
          />
        </NbItem>
      </NbForm>
      <view :style="{marginTop:10}">
        <NbButton
          block
          :on-press="login"
        >
          <NbText>ログイン </NbText>
        </NbButton>
        <NbButton
          :on-press="goToRegister"
          transparent
        >
          <NbText>登録がまだですか？</NbText>
        </NbButton>
      </view>
    </NbContent>
  </NbContainer>
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
