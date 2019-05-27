<template>
  <!-- キーボードで、入力欄が隠れないようにする -->
  <keyboard-avoiding-view
    v-if="user"
    class="keyboard-container"
    :style="{flex: 1}"
    behavior="padding"
    keyboard-vertical-offset="30"
    enabled
  >
    <nb-container>
      <app-header :navigation="navigation" />
      <view :style="styles.container">
        <nb-text :style="styles.headerOne">
          新しいサボタ
        </nb-text>
      </view>
      <nb-content>
        <nb-form>
          <nb-item
            stacked-label
            class="no-margin"
          >
            <nb-label>サボったこと</nb-label>
            <nb-input v-model="form.shouldDone" />
          </nb-item>
          <nb-item
            stacked-label
            class="no-margin"
          >
            <nb-label>やっちゃったこと</nb-label>
            <nb-input v-model="form.mistake" />
          </nb-item>
          <nb-item
            stacked-label
            class="no-margin"
          >
            <nb-label>どのくらい？</nb-label>
            <app-time-picker :on-value-change="(time) => setTime(time)" />
          </nb-item>
          <nb-item
            stacked-label
            class="no-margin"
          >
            <nb-label>説明</nb-label>
            <nb-textarea
              v-model="form.body"
              :row-span="3"
              :style="{width: '100%'}"
              bordered
            />
          </nb-item>
          <nb-button
            :on-press="createSabota"
            block
          >
            <nb-text>サボタを作成</nb-text>
          </nb-button>
        </nb-form>
      </nb-content>
    </nb-container>
  </keyboard-avoiding-view>
</template>

<script>
import { KeyboardAvoidingView } from 'react-native'
import styles from '@/styles'

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
      styles,
      form: {
        shouldDone: null,
        mistake: null,
        time: null,
        body: null
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    createSabota () {
      this.$store.dispatch('sabotas/createSabota', this.form)
        .then((createSabota) => console.log(createSabota))
    },
    setTime (time) {
      this.form.time = time
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
</style>
