<template>
  <v-card
    class="mx-2"
    outlined
  >
    <v-card-title class="text-subtitle-1">
      {{ showTextByType }}毎の実施頻度進捗
      <v-spacer />
      <v-btn
        dark
        text
        color="primary"
        @click="type = type == 'year' ? 'month' : 'year'"
      >
        <v-icon>mdi-swap-horizontal</v-icon>年/月切り替え
      </v-btn>
    </v-card-title>
    <v-card-text>
      <span>集計対象: {{ showTarget }}</span>
      <apexchart
        type="radialBar"
        height="300"
        :options="chartOptions"
        :series="series"
        :key="count"
      />
    </v-card-text>
  </v-card>
</template>

<script>
  import _ from 'lodash'
  export default {
    data() {
      return {
        type: 'month',
        count: 0,
        series: [100],
      }
    },
    computed: {
      showTextByType() {
        return this.type == 'year' ? '年' : '月'
      },
      countDaysOfThisMonthOrYear() {
        return this.type == 'year'
          ? this.$moment().endOf('year').dayOfYear()
          : this.$moment().daysInMonth()
      },
      todayYear() {
        return this.$moment().format('YYYY') + '年'
      },
      todayMonth() {
        return this.$moment().format('MM') + '月'
      },
      showTarget() {
        return this.type == 'year'
          ? this.todayYear
          : this.todayYear + this.todayMonth
      },
      chartOptions() {
        return {
          chart: {
            type: 'radialBar',
            events: {
              mounted: (chartCtx) => {
                const t = chartCtx.el?.querySelector('svg title')
                if (t) t.remove()
              },
              updated: (chartCtx) => {
                const t = chartCtx.el?.querySelector('svg title')
                if (t) t.remove()
              },
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 100],
            },
          },
          tooltip: {
            enabled: false,
            shared: false,
            intersect: false,
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              },
              dataLabels: {
                name: { show: true },
                value: {
                  fontSize: '30px',
                  show: true,
                  formatter: () => {
                    return (this.count || 0) + '日'
                  },
                },
              },
            },
          },
          states: {
            active: {
              filter: {
                type: 'none',
              },
            },
          },
          labels: ['実施日数'],
        }
      },
    },
    watch: {
      type: {
        immediate: true, // 初回表示時も実行
        handler() {
          this.fetchData()
        },
      },
    },
    methods: {
      async fetchData() {
        const bridge = window.chrome.webview.hostObjects.bridge
        const count_result = await bridge.GetWorkoutCountData(this.type)
        this.count = _.get(JSON.parse(count_result)[0], 'count', 0)
        const primaryColor = this.$vuetify.theme.currentTheme.primary
        this.chartOptions = {
          ...this.radarOptions,
          colors: [primaryColor],
        }
        // パーセント計算
        this.series = [
          Math.round((this.count / this.countDaysOfThisMonthOrYear) * 100),
        ]
      },
      async callGetWorkoutCountData() {
        const bridge = window.chrome.webview.hostObjects.bridge
        const count_result = await bridge.GetWorkoutCountData(this.type)
        return JSON.parse(count_result)[0]
      },
    },
  }
</script>
