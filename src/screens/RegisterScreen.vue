
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
          <nb-input placeholder="ユーザー名" auto-capitalize="none" />
        </nb-item>
        <nb-item>
          <nb-input placeholder="メールアドレス" auto-capitalize="none" />
        </nb-item>
        <nb-item>
          <nb-input placeholder="パスワード" auto-capitalize="none" secure-text-entry />
        </nb-item>
        <nb-item>
          <nb-input last placeholder="パスワード(再入力)" auto-capitalize="none" />
        </nb-item>
      </nb-form>
      <view :style="{marginTop:10}">
        <nb-button block>
          <nb-text>登録</nb-text>
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
  data() {
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
    register() {
      alert(JSON.stringify(this.form))
    }
  }
}
</script>

