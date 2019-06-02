<template>
  <keyboard-avoiding-view
    v-if="isSabotaLoaded"
    class="keyboard-container"
    :style="{flex: 1}"
    behavior="padding"
    keyboard-vertical-offset="30"
    enabled
  >
    <nb-container>
      <app-header
        screen="サボタ詳細"
        :navigation="navigation"
      />
      <nb-content>
        <sabota-card
          :sabota="sabota"
          :auth-user="user"
        />
        <comment-create-card
          :sabota-id="sabota.id"
          :input-auto-focus="commentFocus"
        />
        <view v-if="comments && comments.length > 0">
          <comment-card
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          />
        </view>
        <view v-else>
          <app-message
            message="コメントはありません"
            msg-type="warning"
          />
        </view>
      </nb-content>
    </nb-container>
  </keyboard-avoiding-view>
</template>

<script>
import { KeyboardAvoidingView } from 'react-native'
import styles from '@/styles'
import SabotaCard from '@/components/SabotaCard'
import CommentCard from '@/components/CommentCard'
import CommentCreateCard from '@/components/CommentCreateCard'

export default {
  components: {
    SabotaCard,
    CommentCard,
    CommentCreateCard,
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
      commentFocus: false
    }
  },
  computed: {
    sabota () {
      return this.$store.state.sabotas.item
    },
    comments () {
      return this.$store.state.comments.items
    },
    isSabotaLoaded () {
      return Object.keys(this.sabota).length > 0
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  created () {
    // ナビゲーションするときに、sabotaIdをもらう
    const sabotaId = this.navigation.getParam('sabotaId', 'undefined')
    this.commentFocus = this.navigation.getParam('focusComment', false)

    // sabotaの詳細情報を取得
    this.$store.dispatch('sabotas/fetchSabotaById', sabotaId)
  }
}
</script>

<style>
  .keyboard-container {
    padding: 0 10px;
  }
</style>
