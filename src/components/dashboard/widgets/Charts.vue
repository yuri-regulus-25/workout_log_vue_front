<template>
  <v-card
    class="mx-2"
    outlined
  >
    <v-card-title class="text-subtitle-1">
      部位別ボリューム
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
        type="radar"
        height="300"
        :options="radarOptions"
        :series="radarSeries"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>

<script>
  import _ from 'lodash'
  export default {
    data() {
      return {
        type: 'month',
        count: null,
        radarSeries: [],
        radarOptions: {
          chart: {
            type: 'radar',
            toolbar: { show: false },
            // ツールチップのタイトル削除イベントはそのまま残してOK
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
          colors: ['#fff'],
          stroke: {
            show: true,
            width: 2,
            colors: ['#fff'],
          },
          fill: {
            opacity: 0.4,
          },
          markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: '#fff',
            strokeWidth: 2,
          },
          tooltip: {
            enabled: true, // レーダーなら数値が見えたほうが嬉しいのでON推奨
          },
          // ★ここが重要：軸の設定
          xaxis: {
            categories: ['胸', '背中', '肩', '腕', '脚', '尻', '腹'],
            labels: {
              style: {
                colors: ['#888'],
                fontSize: '12px',
              },
            },
          },
          yaxis: {
            show: false, // 数値の軸は隠すとスッキリします
            min: 0
          },
        },
      }
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
        const json = await bridge.GetPartVolumeData(this.type)
        const data = JSON.parse(json)
        // 1. Vuetifyのテーマからprimaryカラーを取得
        const primaryColor = this.$vuetify.theme.currentTheme.primary
        // 2. optionsを更新（ApexChartsに反映させる）
        // ※ネストが深いので、Object.assignやスプレッド演算子を使うと安全です
        this.radarOptions = {
          ...this.radarOptions,
          colors: [primaryColor],
          markers: {
            ...this.radarOptions.markers,
            strokeColor: primaryColor,
          },
          stroke: {
            ...this.radarOptions.stroke,
            colors: [primaryColor],
          },
        }
        // マスタの並び順（表示したい順）を固定
        const categories = ['胸', '背中', '肩', '腕', '脚', '尻', '腹']
        const seriesData = categories.map((cat) => {
          const found = data.find((d) => d.parts_name === cat)
          return found ? found.total_volume : 0
        })

        this.radarSeries = [
          {
            name: this.type === 'year' ? '年間累計' : '今月の累計',
            data: seriesData,
          },
        ]
      },
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
    },
  }
</script>
