<template>
  <v-container fluid class="mx-0">
    <v-row dense>
      <v-col cols="12" md="8">
        <calender-widget @edit-date="openEdit" />
        <recent-activity-widget class="mt-3" @select-activity="openEdit" />
      </v-col>
      <v-col cols="12" md="4">
        <progress-widget />
        <charts-widget class="mt-3" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CalenderWidget from '@components/dashboard/widgets/Calender.vue'
import ProgressWidget from '@components/dashboard/widgets/Progress.vue'
import ChartsWidget from '@components/dashboard/widgets/Charts.vue'
import RecentActivityWidget from '@components/dashboard/widgets/RecentActivity.vue'

export default {
  components: {
    CalenderWidget,
    ProgressWidget,
    ChartsWidget,
    RecentActivityWidget,
  },
  methods: {
    openEdit(date) {
      if (!date) return
      this.$router.push({ name: 'workout_edit', params: { date } })
    },
  },
}
</script>
