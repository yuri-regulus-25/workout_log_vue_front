<template>
  <v-card
    class="mx-2"
    outlined
  >
    <v-card-title class="text-subtitle-1">
      最近の活動
      <v-spacer />
      <v-btn
        dark
        text
        color="primary"
        @click="fetchRecentData"
      >
        <v-icon>mdi-refresh</v-icon>更新
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-list
        three-line
        dense
        class="pa-0"
      >
        <template v-for="(item, index) in activities">
          <v-list-item
            :key="item.id"
            @click="$emit('select-activity', item.date)"
          >
            <v-list-item-avatar color="primary lighten-4">
              <span class="primary--text font-weight-bold">
                {{ item.date.split('-')[1] }}/{{ item.date.split('-')[2] }}
              </span>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ item.parts_summary }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.total_exercises }} 種目 / {{ item.total_sets }} セット
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon small>mdi-chevron-right</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < activities.length - 1"
            :key="'divider-' + index"
          />
        </template>

        <v-list-item v-if="activities.length === 0">
          <v-list-item-content class="text-center grey--text">
            記録がまだありません
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        activities: [],
      }
    },
    mounted() {
      this.fetchRecentData()
    },
    methods: {
      async fetchRecentData() {
        const bridge = window.chrome.webview.hostObjects.bridge
        const json = await bridge.GetRecentActivity()
        this.activities = JSON.parse(json)
      },
    },
  }
</script>
