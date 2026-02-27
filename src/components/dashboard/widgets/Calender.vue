<template>
  <v-card
    class="mx-2"
    outlined
  >
    <v-card-title class="text-subtitle-1">
      カレンダー
      <v-spacer />
      <v-btn
        icon
        color="primary"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        color="primary"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12">
          <p>
            {{ currentMonthDisplay }}
          </p>
        </v-col>
      </v-row>

      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="focus"
          :events="events"
          event-color="primary"
          @click:date="showDetail"
          @click:event="showDetail"
        >
          <template v-slot:day-label="{ date }">
            {{ new Date(date).getDate() }}
          </template>
        </v-calendar>
      </v-sheet>

      <v-navigation-drawer
        v-model="drawer"
        fixed
        right
        temporary
        width="400"
        style="z-index: 2000"
      >
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-btn
            icon
            @click="drawer = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ selectedDateDisplay }} の記録</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <div
            v-if="loading"
            class="text-center pa-4"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>

          <v-data-table
            v-else-if="dayDetails.length > 0"
            :headers="headers"
            :items="dayDetails"
            hide-default-footer
            disable-pagination
            class="elevation-1"
          ></v-data-table>

          <div
            v-else
            class="text-center pa-4 text-body-2 text-grey"
          >
            この日の記録はありません。
          </div>
        </v-container>
      </v-navigation-drawer>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        focus: new Date().toISOString().substr(0, 10), // "2026-02-24"
        events: [],
        drawer: false,
        loading: false,
        selectedDate: '',
        dayDetails: [],
        headers: [
          { text: '種目', value: 'exercise_name', sortable: false },
          {
            text: '重量(kg)',
            value: 'weight',
            align: 'right',
            sortable: false,
          },
          { text: '回数', value: 'reps', align: 'right', sortable: false },
        ],
      }
    },
    computed: {
      // 表示用の "2026-02" を抽出
      currentMonth() {
        return this.focus.substr(0, 7)
      },
      currentMonthDisplay() {
        return this.currentMonth.replace('-', '年') + '月'
      },
      selectedDateDisplay() {
        if (!this.selectedDate) return ''
        // "2026-02-24" を "2月24日" のように変換
        const d = new Date(this.selectedDate)
        return `${d.getMonth() + 1}月${d.getDate()}日`
      },
    },
    watch: {
      // 月が変わったらAPIを叩く
      currentMonth: {
        immediate: true,
        handler(newMonth) {
          this.fetchMonthDates(newMonth)
        },
      },
    },
    methods: {
      async fetchMonthDates(month) {
        const bridge = window.chrome.webview.hostObjects.bridge
        const json = await bridge.GetWorkoutDates(month)
        const dates = JSON.parse(json)

        // カレンダーのイベント形式に変換
        this.events = dates.map((d) => ({
          name: '記録を見る',
          start: d,
          end: d,
          timed: false,
        }))
      },
      async showDetail(payload) {
        const targetDate = payload.date || (payload.day && payload.day.date)

        if (!targetDate) {
          return null;
        }

        // 取得した日付をセットしてドロワーを開く
        this.selectedDate = targetDate
        this.drawer = true
        this.loading = true

        try {
          const bridge = window.chrome.webview.hostObjects.bridge
          // C#のメソッドを呼ぶ (後で作る)
          const json = await bridge.GetWorkoutDetailByDate(this.selectedDate)
          this.dayDetails = JSON.parse(json)
        } catch (error) {
          this.dayDetails = []
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>
