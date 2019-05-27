<template>
  <view :style="inputStyle">
    <nb-picker
      mode="dropdown"
      placeholder="Select Time"
      placeholder-style="{ color: '#bfc6ea' }"
      :selected-value="selectedValue"
      :on-value-change="handleValueChange"
    >
      <nb-item
        v-for="time in times"
        :key="time"
        :label="time"
        :value="time"
      />
    </nb-picker>
  </view>
</template>

<script>
export default {
  props: {
    interval: {
      type: Number,
      default: 30
    },
    onValueChange: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      times: this.generateTimes(),
      selectedValue: '',
      inputStyle: { flex: 1,
        alignSelf: 'stretch',
        paddingLeft: null,
        marginLeft: null,
        heigth: 50 }
    }
  },
  methods: {
    handleValueChange (time) {
      this.selectedValue = time
      this.onValueChange(time)
    },
    generateTimes () {
      const times = [] // time array
      let tt = 0 // start time
      // times = [00:00, 00:30, 01:00, 01:30, 02:00 ...]
      for (let i = 0; tt < 24 * 60; i++) {
        const hh = Math.floor(tt / 60) // 0~24の時間を取得
        const mm = (tt % 60) // 0~59の分を取得
        times[i] = ('0' + (hh >= 12 ? hh % 24 : hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2) // '0' + '12' からsliceで後ろから2文字取り出す
        tt += this.interval
      }
      times.push('24:00') // maxは24時間かな。
      return times
    }
  }
}
</script>
