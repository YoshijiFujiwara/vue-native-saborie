<template>
  <nb-card :style="style.cardStyle">
    <!-- 時間セクション -->
    <nb-card-item :style="style.timeCardItem">
      <nb-text :style="styles.textWhiteGray">{{ sabota.created_at }}</nb-text>
    </nb-card-item>
    <!-- サボタの３要素 -->
    <nb-card-item>
      <nb-left>
        <nb-body>
          <view :style="style.cardBodyStyle">
            <nb-button
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
              :style="style.mistakeButton"
            >
              <nb-text>{{ sabota.shouldDone }}</nb-text>
            </nb-button>
            <nb-text :style="styles.textGray">
              を
            </nb-text>
          </view>
          <view :style="style.cardBodyStyle">
            <nb-button
              rounded
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
    <nb-card-item :style="styles.bgWhite">
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
            <nb-text :style="Object.assign({fontWeight: 'bold'}, styles.textGray)">
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
    <nb-card-item :style="{ paddingVertical: 0 }">
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
      <nb-right>
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
import { PRIMARY_COLOR, MISTAKE_COLOR, SHOULDDONE_COLOR, TIME_COLOR } from '../styles/colors'
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
    }
  }
}
</script>

<style>

</style>
