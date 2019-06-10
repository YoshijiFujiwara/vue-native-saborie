<template>
  <nb-container :style="styles.bgWhite">
    <app-header
      :navigation="navigation"
      screen="関連するサボタ"
    />
    <nb-content v-if="sabotas && sabotas.length > 0">
      <scroll-view>
        <view :style="{paddingLeft: 3, marginTop: 5, flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}">
          <nb-button
            rounded
            :style="buttonStyle"
          >
            <nb-text :style="{fontSize: 20}">
              {{ attributeTitle }}
            </nb-text>
          </nb-button>
          <nb-text :style="{fontSize: 20}">
            が同じサボタ一覧
          </nb-text>
        </view>
        <sabota-card
          v-for="sabota in sabotas"
          :key="sabota.id"
          :sabota="sabota"
          :auth-user="user"
          :navigate-to-detail="goToSabotaDetail"
          :navigate-to-edit="goToSabotaEdit"
          :navigation="navigation"
        />
      </scroll-view>
    </nb-content>
  </nb-container>
</template>

<script>
import SabotaCard from '@/components/SabotaCard'
import styles from '@/styles'
import { MISTAKE_COLOR, SHOULDDONE_COLOR, TIME_COLOR } from '../styles/colors'

export default {
  components: {
    SabotaCard
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data () {
    return {
      attribute: '',
      searchType: '',
      styles,
      style: {
        mistakeButton: {
          backgroundColor: MISTAKE_COLOR,
          height: 40,
          marginRight: 5
        },
        shouldDoneButton: {
          backgroundColor: SHOULDDONE_COLOR,
          height: 40,
          marginRight: 5
        },
        timeButton: {
          backgroundColor: TIME_COLOR,
          height: 40,
          marginRight: 5
        }
      }
    }
  },
  computed: {
    sabotas () {
      return this.$store.state.linkedSabotas.items
    },
    attributeTitle () {
      if (this.searchType === 'time') {
        return this.setJapaneseTime(this.attribute)
      }
      return this.attribute
    },
    buttonStyle () {
      let backgroundColor
      switch (this.searchType) {
        case 'shouldDone':
          backgroundColor = SHOULDDONE_COLOR
          break
        case 'mistake':
          backgroundColor = MISTAKE_COLOR
          break
        case 'time':
          backgroundColor = TIME_COLOR
          break
        default:
          break
      }
      return {
        backgroundColor,
        height: 40,
        marginRight: 5
      }
    },
    user () {
      return this.$store.state.auth.user
    }
  },
  created () {
    const sabotaId = this.navigation.getParam('sabotaId', 'undefined')
    this.attribute = this.navigation.getParam('attribute', 'undefined')
    this.searchType = this.navigation.getParam('type', 'undefined')
  },
  methods: {
    // inputCommentがtrueなら、コメントのところに、フォーカスした状態で始めたいですね
    goToSabotaDetail (sabotaId, focusComment = false) {
      // ナビゲーションするときに、sabotaIdを渡す
      this.navigation.navigate('SabotaDetail', { sabotaId, focusComment })
    },
    goToSabotaEdit (sabotaId) {
      this.navigation.navigate('SabotaEdit', { sabotaId })
    },
    // 日本時間で表記
    setJapaneseTime (time) {
      const hours = Math.floor(time / 60)
      const minutes = time % 60

      const hourString = hours !== 0 ? `${hours}時間` : ''
      const minutesString = hours !== 0 && minutes === 0 ? '' : `${minutes}分`

      return hourString + minutesString
    },
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
