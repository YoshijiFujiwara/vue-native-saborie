<template>
  <nb-card>
    <nb-card-item bordered>
      <nb-left>
        <nb-body>
          <nb-text>{{sabota.shouldDone}}をさぼって、{{sabota.mistake}}を{{sabota.time}}分やっちゃった！！{{alreadyMetoo}}{{alreadyLiked}}</nb-text>
        </nb-body>
      </nb-left>
    </nb-card-item>
    <nb-card-item>
      <nb-body>
        <nb-text>{{sabota.body}}</nb-text>
      </nb-body>
    </nb-card-item>
    <nb-card-item :style="{ paddingVertical: 0 }">
      <nb-left>
        <nb-button transparent :on-press="handleSwitchMetoo">
          <nb-icon name="md-people"></nb-icon>
          <nb-text>{{sabota.metooUserIds ? sabota.metooUserIds.length : '0'}}</nb-text>
        </nb-button>
        <nb-button transparent>
          <nb-icon name="heart" :on-press="handleSwitchLove"></nb-icon>
          <nb-text>{{sabota.loveUserIds ? sabota.loveUserIds.length : '0'}}</nb-text>
        </nb-button>
        <nb-button transparent :on-press="handleCommentButtonTap">
          <nb-icon name="md-chatbubbles"></nb-icon>
          <nb-text>{{sabota.commentUserIds ? sabota.commentUserIds.length : '0'}}</nb-text>
        </nb-button>
      </nb-left>
      <nb-right>
        <nb-button v-if="navigateToDetail != undefined" :on-press="() => navigateToDetail(sabota.id)">
          <nb-icon name="md-arrow-dropright"></nb-icon>
          <nb-text>詳細</nb-text>
        </nb-button>
      </nb-right>
    </nb-card-item>
  </nb-card>
</template>

<script>
import axiosInstance from '@/services/axios'

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
    },
    showLoginAlert: {
      type: Function
    },
    showYourPostAlert: {
      type: Function
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
      if (!this.loggedIn) {
        this.showLoginAlert()
      }
    }
  }
}
</script>

<style>

</style>
