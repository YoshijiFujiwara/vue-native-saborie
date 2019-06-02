<template>
  <nb-container>
    <app-header
      root
      :navigation="navigation"
      screen="マイページ"
    />
    <nb-content>
      <!-- グラフで可視化 -->
      <nb-tabs
        :tab-bar-underline-style="styles.noBorderTabUnderline"
        :style="{borderBottomWidth: 0}"
      >
        <nb-tab
          :tab-style="styles.bgPrimary"
          :active-tab-style="styles.bgPrimary"
          :text-style="styles.textAccent"
          :active-text-style="styles.textWhite"
          heading="やっちゃった"
        >
          <summary-tab
            summary-name="mistake"
            :go-to-login="goToLogin"
            :go-to-register="goToRegister"
          />
        </nb-tab>
        <nb-tab
          :tab-style="styles.bgPrimary"
          :active-tab-style="styles.bgPrimary"
          :text-style="styles.textAccent"
          :active-text-style="styles.textWhite"
          heading="やるべきだった"
        >
          <summary-tab
            summary-name="shouldDone"
            :go-to-login="goToLogin"
            :go-to-register="goToRegister"
          />
        </nb-tab>
      </nb-tabs>
      <!-- 自分の投稿一覧 -->
      <scroll-view v-if="user && mySabotas && mySabotas.length > 0">
        <nb-text class="header-1">
          自分の投稿一覧
        </nb-text>
        <sabota-card
          v-for="sabota in mySabotas"
          :key="sabota.id"
          :sabota="sabota"
          :auth-user="user"
          :navigate-to-detail="goToSabotaDetail"
        />
      </scroll-view>
    </nb-content>
  </nb-container>
</template>

<script>
import SummaryTab from '@/components/SummaryTab'
import SabotaCard from '@/components/SabotaCard'
import styles from '@/styles'

export default {
  components: {
    SummaryTab,
    SabotaCard
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      styles
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    mySabotas () {
      return this.$store.state.mySabotas.items
    }
  },
  created () {
    if (this.user) {
      this.$store.dispatch('mySabotas/fetchSabotas')
      this.$store.dispatch(`mistakeSummary/getSummary`)
      this.$store.dispatch(`shouldDoneSummary/getSummary`)
    }
  },
  methods: {
    goToRegister () {
      this.navigation.navigate('Register')
    },
    goToLogin () {
      this.navigation.navigate('Login')
    },
    goToSabotaDetail (sabotaId, focusComment = false) {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId, focusComment })
    }
  }
}
</script>

<style>
  .header-1 {
    font-size: 23px;
    padding: 20px;
    font-weight: bold;
  }
</style>
