<template>
  <view>
    <view
      v-if="user && chartData"
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
    <!-- ログインしてない -->
    <view v-else>
      <nb-text class="header-1">
        ログインすると、自分のサボりグセが一目瞭然！
      </nb-text>
      <nb-text>下のグラフは、一例です</nb-text>
      <pie-chart
        :data="dummyChartData"
        :width="screenWidth"
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
      }
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
    },
    dummyChartData () {
      switch (this.summaryName) {
        case 'mistake':
          return [
            { name: 'ゲーム', sumTime: 1200, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'テレビ', sumTime: 600, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'YouTube', sumTime: 400, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 }
          ]
        case 'shouldDone':
          return [
            { name: '仕事', sumTime: 1000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: '家事', sumTime: 500, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: '勉強', sumTime: 400, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: '運動', sumTime: 300, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 }
          ]
        default:
          return []
      }
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
