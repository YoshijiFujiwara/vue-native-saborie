<template>
  <view
    :style="{ flex: 1,
              alignItems: 'center'}"
  >
    <nb-text class="header-1">
      合計: 20時間
    </nb-text>
    <pie-chart
      :data="chartData"
      :width="screenWidth"
      :height="300"
      :chart-config="chartConfig"
      accessor="sumTime"
      background-color="transparent"
      padding-left="15"
      absolute
    />
  </view>
</template>

<script>
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default {
  components: {
    PieChart
  },
  data () {
    return {
      screenWidth: Dimensions.get('window').width, // レスポンシブにする
      chartConfig: {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2 // optional, default 3
      }
    }
  },
  computed: {
    summary () {
      return this.$store.state.mistakeSummary.items
    },
    chartData () {
      let data = []
      for (var key in this.summary) {
        if (this.summary.hasOwnProperty(key)) {
          data.push({
            name: key,
            sumTime: this.summary[key].sumTime,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          })
        }
      }
      return data
    }
  },
  created () {
    this.$store.dispatch('mistakeSummary/getSummary')
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
