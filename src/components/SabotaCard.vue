<template>
  <nb-card :style="style.cardStyle">
    <!-- 時間セクション -->
    <nb-card-item :style="[style.timeCardItem, myPostCardStyle]">
      <nb-text :style="[styles.textWhiteGray, {fontSize: 13}]">
        {{ sabota.created_at }}
      </nb-text>
    </nb-card-item>
    <!-- サボタの３要素 -->
    <nb-card-item :style="[{marginTop: 0}, myPostCardStyle]">
      <nb-left>
        <nb-body>
          <view :style="style.cardBodyStyle">
            <nb-button
              :on-press="() => goToLinkedSabotasByShouldDone(sabota.id, sabota.shouldDone)"
              rounded
              :style="style.shouldDoneButton"
            >
              <nb-text>{{ sabota.shouldDone }}</nb-text>
            </nb-button>
            <nb-text :style="styles.textGray">
              をさぼって、
            </nb-text>
          </view>
          <view :style="style.cardBodyStyle">
            <nb-button
              rounded
              :on-press="() => goToLinkedSabotasByMistake(sabota.id, sabota.mistake)"
              :style="style.mistakeButton"
            >
              <nb-text>{{ sabota.mistake }}</nb-text>
            </nb-button>
            <nb-text :style="styles.textGray">
              を
            </nb-text>
          </view>
          <view :style="style.cardBodyStyle">
            <nb-button
              rounded
              :on-press="() => goToLinkedSabotasByTime(sabota.id, sabota.time)"
              :style="style.timeButton"
            >
              <nb-text>{{ setJapaneseTime }}</nb-text>
            </nb-button>
            <nb-text :style="styles.textGray">
              やっちゃった！！
            </nb-text>
          </view>
        </nb-body>
      </nb-left>
    </nb-card-item>
    <!-- 言い訳セクション -->
    <nb-card-item :style="[styles.bgWhite, myPostCardStyle]">
      <nb-body :style="{flex: 1, flexDirection: 'row'}">
        <nb-icon
          :style="styles.textGray"
          name="person"
        />
        <view :style="style.excuseView">
          <nb-text
            v-if="sabota.body && sabota.body.length > 0"
            :style="{padding: 3}"
          >
            <nb-text :style="[{fontWeight: 'bold'}, styles.textGray]">
              {{ sabota.body }}
            </nb-text>
            <nb-text :style="styles.textGray">
              が原因です。。。
            </nb-text>
          </nb-text>
          <nb-text
            v-else
            :style="{padding: 3}"
          >
            <nb-text :style="styles.textGray">
              言い訳はありません。。。
            </nb-text>
          </nb-text>
        </view>
      </nb-body>
    </nb-card-item>
    <!-- アクションボタン系 -->
    <nb-card-item :style="[{ paddingVertical: 0, marginTop: -10 }, myPostCardStyle]">
      <nb-left>
        <nb-button
          transparent
          :on-press="handleSwitchMetoo"
        >
          <nb-icon
            name="md-people"
            :style="{ color: metooColor }"
          />
          <nb-text :style="{ color: metooColor }">
            {{ sabota.metooUserIds ? sabota.metooUserIds.length : '0' }}
          </nb-text>
        </nb-button>
        <nb-button transparent>
          <nb-icon
            name="heart"
            :on-press="handleSwitchLove"
            :style="{ color: likedColor }"
          />
          <nb-text :style="{ color: likedColor }">
            {{ sabota.loveUserIds ? sabota.loveUserIds.length : '0' }}
          </nb-text>
        </nb-button>
        <nb-button
          transparent
          :on-press="handleCommentButtonTap"
        >
          <nb-icon name="md-chatbubbles" />
          <nb-text>{{ sabota.commentUserIds ? sabota.commentUserIds.length : '0' }}</nb-text>
        </nb-button>
      </nb-left>
      <nb-right :style="{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}">
        <nb-button
          v-if="navigateToEdit != undefined && authUser && authUser.id === sabota.postUser.id"
          :style="[styles.bgPrimary, {marginRight: 5}]"
          rounded
          :on-press="() => navigateToEdit(sabota.id)"
        >
          <nb-icon name="brush" />
        </nb-button>
        <nb-button
          v-if="navigateToDetail != undefined"
          :style="styles.bgPrimary"
          rounded
          :on-press="() => navigateToDetail(sabota.id)"
        >
          <nb-icon name="arrow-round-forward" />
        </nb-button>
      </nb-right>
    </nb-card-item>
  </nb-card>
</template>

<script>
import axiosInstance from '@/services/axios'
import { Toast } from 'native-base'
import styles from '@/styles'
import {
  PRIMARY_COLOR,
  MISTAKE_COLOR,
  SHOULDDONE_COLOR,
  TIME_COLOR,
  ACCENT_COLOR,
  ACCENT_SECONDARY_COLOR
} from '../styles/colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen'

export default {
  props: {
    sabota: {
      type: Object,
      required: true
    },
    navigateToDetail: {
      type: Function
    },
    navigateToEdit: {
      type: Function
    },
    navigation: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object
    }
  },
  data () {
    return {
      wp,
      hp,
      loc,
      rol,
      styles,
      style: {
        cardStyle: {
          borderColor: PRIMARY_COLOR,
          paddingTop: 0
        },
        cardBodyStyle: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 4
        },
        mistakeButton: {
          backgroundColor: MISTAKE_COLOR,
          height: 30,
          marginRight: 5
        },
        shouldDoneButton: {
          backgroundColor: SHOULDDONE_COLOR,
          height: 30,
          marginRight: 5
        },
        timeButton: {
          backgroundColor: TIME_COLOR,
          height: 30,
          marginRight: 5
        },
        excuseView: {
          borderColor: PRIMARY_COLOR,
          borderWidth: 1,
          marginLeft: 4,
          borderRadius: 4,
          maxWidth: wp('82%')
        },
        timeCardItem: {
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          marginBottom: 0,
          marginRight: 1,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }
      }
    }
  },
  computed: {
    myPostCardStyle () { // 自分の投稿の時、背景色を少し変更する
      return this.isMySabota ? { backgroundColor: ACCENT_SECONDARY_COLOR } : {}
    },
    loggedIn () {
      return this.authUser != null
    },
    isMySabota () {
      return this.loggedIn && (this.authUser.id === this.sabota.postUser.id)
    },
    alreadyMetoo () {
      return this.loggedIn && this.sabota.metooUserIds && this.sabota.metooUserIds.includes(this.authUser.id)
    },
    alreadyLiked () {
      return this.loggedIn && this.sabota.loveUserIds && this.sabota.loveUserIds.includes(this.authUser.id)
    },

    // 日本時間で表記
    setJapaneseTime () {
      const hours = Math.floor(this.sabota.time / 60)
      const minutes = this.sabota.time % 60

      const hourString = hours !== 0 ? `${hours}時間` : ''
      const minutesString = hours !== 0 && minutes === 0 ? '' : `${minutes}分`

      return hourString + minutesString
    },

    // styleたち
    metooColor () {
      return this.alreadyMetoo ? '#5d13e7' : '#5ca0d3'
    },
    likedColor () {
      return this.alreadyLiked ? '#f54291' : '#ffa0d2'
    }
  },
  methods: {
    async handleSwitchMetoo () {
      if (!this.loggedIn) {
        this.showLoginAlert()
      } else {
        await axiosInstance.put(`/sabotas/${this.sabota.id}/switch_metoo`)
          .then(res => {
            if (this.alreadyMetoo) {
              const filterdIds = this.sabota.metooUserIds.filter(item => item !== this.authUser.id)
              this.sabota.metooUserIds = filterdIds
            } else if (this.sabota.metooUserIds == null) {
              this.sabota.metooUserIds = [this.authUser.id]
            } else {
              this.sabota.metooUserIds.push(this.authUser.id)
            }
          })
          .catch(() => {
            this.showYourPostAlert()
          })
      }
    },
    async handleSwitchLove () {
      if (!this.loggedIn) {
        this.showLoginAlert()
      } else {
        await axiosInstance.put(`/sabotas/${this.sabota.id}/switch_love`)
          .then(res => {
            if (this.alreadyLiked) {
              const filterdIds = this.sabota.loveUserIds.filter(item => item !== this.authUser.id)
              this.sabota.loveUserIds = filterdIds
            } else if (this.sabota.loveUserIds == null) {
              this.sabota.loveUserIds = [this.authUser.id]
            } else {
              this.sabota.loveUserIds.push(this.authUser.id)
            }
          })
          .catch(() => {
            this.showYourPostAlert()
          })
      }
    },
    handleCommentButtonTap () {
      if (this.loggedIn) {
        if (this.navigateToDetail) {
          this.navigateToDetail(this.sabota.id, true)
        } else {
          // なにもしなくていいでしょう
        }
      } else {
        this.showLoginAlert()
      }
    },
    showLoginAlert () { // ログインが必要なところをタップしとき、alertを表示する
      Toast.show({
        text: 'ログインが必要です',
        buttonText: 'Ok',
        type: 'warning',
        position: 'top',
        duration: 3000
      })
    },
    showYourPostAlert () {
      Toast.show({
        text: '自分の投稿にはアクションできません',
        buttonText: 'Ok',
        type: 'warning',
        position: 'top',
        duration: 3000
      })
    },
    // やるべきことで関連するサボタを探す
    goToLinkedSabotasByShouldDone (sabotaId, shouldDone) {
      this.goToLinkedSabotas('shouldDone', sabotaId, shouldDone)
    },
    // やっちゃったことで関連するサボタを探す
    goToLinkedSabotasByMistake (sabotaId, mistake) {
      this.goToLinkedSabotas('mistake', sabotaId, mistake)
    },
    // 時間で関連するサボタを探す
    goToLinkedSabotasByTime (sabotaId, time) {
      this.goToLinkedSabotas('time', sabotaId, time)
    },
    goToLinkedSabotas (type, sabotaId, attribute) {
      this.$store.dispatch('linkedSabotas/fetchSabotas', { type, sabotaId, attribute })
      this.navigation.navigate('LinkedSabotas', { type, sabotaId, attribute })
    }
  }
}
</script>

<style>

</style>
