<template>
  <view class="container">
    <text class="text-color-primary">{{ title }}</text>
    <Hello />
  </view>
</template>

<script>
import Hello from './src/components/Hello';
import HelloScreen from './src/screens/HomeScreen';

export default {
  components: {
    Hello,
    HelloScreen
  },
  data () {
    return {
      title: 'サボリー'
    }
  }
}
</script>
npm install --save eslint eslint-plugin-vue@next eslint-config-vue
<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>
