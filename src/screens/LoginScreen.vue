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
          <nb-input placeholder="メールアドレス" auto-capitalize="none"/>
        </nb-item>
        <nb-item last>
          <nb-input placeholder="パスワード" auto-capitalize="none" secure-text-entry />
        </nb-item>
      </nb-form>
      <view :style="{marginTop:10}">
        <nb-button block>
          <nb-text>ログイン </nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
export default {

}
</script>
