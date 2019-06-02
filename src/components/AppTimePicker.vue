<template>
  <view :style="inputStyle">
    <nb-picker
      ios-header="かかった時間を選んでください"
      :style="styles.textTime"
      mode="dropdown"
      placeholder="かかった時間を選んでください"
      placeholder-style="{ color: '#bfc6ea' }"
      :selected-value="selectedValue"
      :on-value-change="handleValueChange"
    >
      <nb-item
        v-for="time in times"
        :key="time"
        :label="time + '分'"
        :value="calcMinutes(time)"
      />
    </nb-picker>
  </view>
</template>

<script>
import styles from '@/styles'
export default {
  props: {
    interval: {
      type: Number,
      default: 30
    },
    onValueChange: {
      type: Function,
      required: true
    },
    where: {
      type: String,
      default: 'create'
    }
  },
  data () {
    return {
      styles,
      times: this.generateTimes(),
      inputStyle: { flex: 1,
        alignSelf: 'stretch',
        paddingLeft: null,
        marginLeft: null,
        heigth: 50 }
    }
  },
  computed: {
    selectedValue () {
      if (this.where === 'create') {
        return this.$store.state.selectedTime.createItem
      } else if (this.where === 'search') {
        return this.$store.state.selectedTime.searchItem
      }
      return ''
    }
  },
  methods: {
    handleValueChange (time) {
      // https://github.com/facebook/react-native/issues/15556 参照
      // pickerを使う時、onValueChangeイベントが正常に発火しない場合があるので、setTimeoutを使うといいらしい（よくわからないが）
      setTimeout(() => {
        this.selectedValue = time
        this.onValueChange(time)

        if (this.where === 'create') {
          this.$store.dispatch('selectedTime/changeCreateTime', time)
        } else if (this.where === 'search') {
          this.$store.dispatch('selectedTime/changeSearchTime', time)
        }
      }, 10)
    },
    generateTimes () {
      const times = [] // time array
      let tt = 0 // start time
      // times = [00:00, 00:30, 01:00, 01:30, 02:00 ...]
      for (let i = 0; tt < 24 * 60; i++) {
        const hh = Math.floor(tt / 60) // 0~24の時間を取得
        const mm = (tt % 60) // 0~59の分を取得
        times[i] = ('0' + (hh >= 12 ? hh % 24 : hh % 12)).slice(-2) + '時間' + ('0' + mm).slice(-2)// '0' + '12' からsliceで後ろから2文字取り出す
        tt += this.interval
      }
      times.push('24時間00') // maxは24時間かな。
      return times
    },
    calcMinutes (timeString) { // hh:mm 形式から分に計算する
      const times = timeString.split('時間')
      return parseInt(times[0]) * 60 + parseInt(times[1])
    }
  }
}
</script>
