<template>
  <!-- キーボードで、入力欄が隠れないようにする -->
  <keyboard-avoiding-view
    class="keyboard-container"
    :style="{flex: 1}"
    behavior="padding"
    keyboard-vertical-offset="30"
    enabled
  >
    <nb-container>
      <app-header
        :navigation="navigation"
        screen="検索"
        root
      />
      <nb-form>
        <nb-item rounded>
          <nb-input
            v-model="form.keyWord"
            placeholder="キーワード"
          />
        </nb-item>
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
        <nb-button
          v-if="!allEmpty"
          :on-press="searchSabota"
          block
        >
          <nb-text>サボタを検索</nb-text>
        </nb-button>
      </nb-form>
      <view v-if="showResult">
        <scroll-view v-if="searchSabotas && searchSabotas.length > 0">
          <nb-text class="header-1">
            検索結果
          </nb-text>
          <sabota-card
            v-for="sabota in searchSabotas"
            :key="sabota.id"
            :sabota="sabota"
            :auth-user="user"
            :navigate-to-detail="goToSabotaDetail"
          />
        </scroll-view>
        <view v-else>
          <nb-text class="header-1">
            サボタが見つかりませんでした
          </nb-text>
        </view>
      </view>
    </nb-container>
  </keyboard-avoiding-view>
</template>

<script>
import SabotaCard from '@/components/SabotaCard'
import { KeyboardAvoidingView } from 'react-native'

export default {
  components: {
    KeyboardAvoidingView,
    SabotaCard
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        keyWord: '',
        shouldDone: '',
        mistake: '',
        time: 0
      },
      showResult: false
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    allEmpty () {
      return this.form.keyWord === '' && this.form.shouldDone === '' && this.form.mistake === '' && this.form.time === 0
    },
    searchSabotas () {
      return this.$store.state.searchSabotas.items
    }
  },
  methods: {
    setTime (time) {
      this.form.time = time
    },
    searchSabota () {
      // 検索
      this.$store.dispatch('searchSabotas/searchSabotas', this.form)
        .then(this.showResult = true)
    },
    // inputCommentがtrueなら、コメントのところに、フォーカスした状態で始めたいですね
    goToSabotaDetail (sabotaId, focusComment = false) {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId, focusComment })
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

  .header-1 {
    font-size: 23px;
    padding: 20px;
    font-weight: bold;
  }

  .header-2 {
    font-size: 20px;
    padding: 20px;
    font-weight: bold;
  }
</style>
