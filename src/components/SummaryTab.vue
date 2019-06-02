<template>
  <view>
    <view
      v-if="user && chartData"
      :style="{ flex: 1,
                alignItems: 'center'}"
    >
      <nb-text class="header-1">
        合計: {{sumHour}}時間
      </nb-text>
      <pie-chart
        :data="chartData"
        :width="screenWidth * 0.9"
        :height="300"
        :chart-config="chartConfig"
        accessor="sumTime"
        background-color="transparent"
        padding-left="15"
        absolute
      />
    </view>
    <!-- ログインしてない -->
    <view v-else :style="{flex: 1, flexDirection: 'column', alignItems: 'center'}">
      <nb-text class="header-1">
        ログインすると、自分のサボりグセが一目瞭然！
      </nb-text>
      <nb-text>下のグラフは、一例です</nb-text>
      <pie-chart
        :data="dummyChartData"
        :width="screenWidth * 0.9"
        :height="300"
        :chart-config="chartConfig"
        accessor="sumTime"
        background-color="transparent"
        padding-left="15"
        absolute
      />
      <nb-button
        :on-press="goToLogin"
        transparent
      >
        <nb-text>アカウントをお持ちの方はこちら</nb-text>
      </nb-button>
      <nb-button
        :on-press="goToRegister"
        transparent
      >
        <nb-text>登録がまだの方はこちら</nb-text>
      </nb-button>
    </view>
  </view>
</template>

<script>
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default {
  components: {
    PieChart
  },
  props: {
    summaryName: { // ['mistake', 'shouldDone']
      type: String,
      required: true
    },
    goToLogin: {
      type: Function,
      required: true
    },
    goToRegister: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      screenWidth: Dimensions.get('window').width, // レスポンシブにする
      chartConfig: {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2 // optional, default 3
      },
      colorArray: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
        '#FF9655', '#FFF263', '#6AF9C4']
    }
  },
  computed: {
    summary () {
      return this.$store.state[`${this.summaryName}Summary`].items
    },
    user () {
      return this.$store.state.auth.user
    },
    chartData () {
      const data = []
      let sumTime = 0
      for (var key in this.summary) {
        if (this.summary.hasOwnProperty(key)) {
          sumTime += this.summary[key].sumTime
          data.push({
            name: key,
            sumTime: this.summary[key].sumTime,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          })
        }
      }
      // 時間の長い順にソート
      data.sort(this.compareTime)
      // colorは後入れして、順位ごとの色を揃えよう
      for (let i = 0; i < data.length; i++) {
        data[i].color = this.colorArray[i % this.colorArray.length]
      }

      // ついでに合計の時間も計算する
      this.$store.dispatch('sumTime/changeSumTime', sumTime)
      return data
    },
    sumHour () {
      return this.$store.state.sumTime.item / 60
    },
    dummyChartData () {
      switch (this.summaryName) {
        case 'mistake':
          return [
            { name: 'ゲーム', sumTime: 1200, color: this.colorArray[0], legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'テレビ', sumTime: 600, color: this.colorArray[1], legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'YouTube', sumTime: 400, color: this.colorArray[2], legendFontColor: '#7F7F7F', legendFontSize: 15 }
          ]
        case 'shouldDone':
          return [
            { name: '仕事', sumTime: 1000, color: this.colorArray[0], legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: '家事', sumTime: 500, color: this.colorArray[1], legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: '勉強', sumTime: 400, color: this.colorArray[2], legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: '運動', sumTime: 300, color: this.colorArray[3], legendFontColor: '#7F7F7F', legendFontSize: 15 }
          ]
        default:
          return []
      }
    },
  },
  methods: {
    compareTime (a, b) {
      const timeA = a.sumTime
      const timeB = b.sumTime

      let comparison = 0
      if (timeA > timeB) {
        comparison = -1
      } else if (timeA < timeB) {
        comparison = 1
      }
      return comparison
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
