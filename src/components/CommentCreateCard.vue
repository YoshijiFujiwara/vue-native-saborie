<template>
  <nb-form v-if="user">
    <nb-textarea
      v-model="form.body"
      :auto-focus="inputAutoFocus"
      :row-span="3"
      bordered
      placeholder="コメント"
    />
    <nb-button
      v-if="form.body != ''"
      :on-press="postComment"
      block
    >
      <nb-text>コメントを送信</nb-text>
    </nb-button>
  </nb-form>
</template>

<script>
import { Keyboard } from 'react-native'

export default {
  props: {
    sabotaId: {
      type: Number,
      required: true
    },
    inputAutoFocus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        body: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    postComment () {
      this.$store.dispatch('comments/createComment', {
        sabotaId: this.sabotaId,
        commentData: this.form
      })
        .then(res => {
          this.form.body = ''
          Keyboard.dismiss()
        })
    }
  }
}
</script>

<style>

</style>
