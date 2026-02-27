<template>
  <v-container fluid class="mx-0">
    <bread-crumb :list="breadcrumb('workout_edit')" />

    <v-card class="mx-2" outlined>
      <v-card-title class="text-subtitle-1">
        ワークアウト登録
        <v-spacer />
        <v-btn color="primary" :loading="saving" @click="save">
          <v-icon left>mdi-check</v-icon>保存
        </v-btn>
      </v-card-title>

      <v-card-text>
        {{ date }}
        <v-row v-for="(item, index) in workoutList" :key="index" dense align="center">
          <v-col cols="4">
            <v-text-field
              outlined
              v-model="item.exercise_name"
              label="種目名"
              dense
              hide-details
            />
          </v-col>

          <v-col cols="2">
            <v-select
              outlined
              dense
              hide-details
              v-model="item.parts_code"
              :items="partsOptions"
              item-text="text"
              item-value="value"
              label="部位"
            />
          </v-col>

          <v-col cols="2">
            <v-text-field
              outlined
              v-model="item.weight"
              label="kg"
              type="number"
              dense
              hide-details
              :disabled="isCardio(item)"
            />
          </v-col>

          <v-col cols="1">
            <v-text-field
              outlined
              v-model="item.reps"
              label="rep"
              type="number"
              dense
              hide-details
              :disabled="isCardio(item)"
            />
          </v-col>

          <v-col cols="1">
            <v-text-field
              outlined
              v-model="item.sets"
              label="set"
              type="number"
              dense
              hide-details
              :disabled="isCardio(item)"
            />
          </v-col>

          <v-col cols="2" class="text-right">
            <v-btn icon color="error" @click="removeLine(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-btn block outlined color="primary" class="mt-4" @click="addLine">
          <v-icon left>mdi-plus</v-icon>行を追加
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import BreadCrumb from '@components/common/BreadCrumb.vue'
import ROUTE from '@resources/route.js'
import _ from 'lodash'
import { getBridge, normalizeWorkoutDetails, parseJson } from '@/utils/util.js'

export default {
  components: { BreadCrumb },

  data() {
    return {
      saving: false,
      workoutList: [],
      partsOptions: [
        { text: '胸', value: 'CHEST' },
        { text: '背中', value: 'BACK' },
        { text: '肩', value: 'SHOULDERS' },
        { text: '腕', value: 'ARMS' },
        { text: '脚', value: 'LEGS' },
        { text: '尻', value: 'GLUTES' },
        { text: '腹', value: 'ABS' },
        { text: '有酸素', value: 'CARDIO' },
      ],
    }
  },

  computed: {
    // /workout/edit/:date
    date() {
      return (this.$route && this.$route.params) ? this.$route.params.date : null
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    breadcrumb(target) {
      return _.get(_.find(ROUTE, { name: target }), 'meta.breadcrumb', [])
    },

    isCardio(item) {
      return (item?.parts_code ?? '').toString().trim().toUpperCase() === 'CARDIO'
    },

    emptyRow() {
      return {
        id: 0,
        session_id: 0,
        machine_id: null,
        exercise_name: '',
        parts_code: 'CHEST',
        weight: null,
        reps: null,
        sets: null,
        memo: null,
      }
    },

    async initialize() {
      // date が取れない場合の保険（routeがおかしい）
      if (!this.date) {
        this.workoutList = [this.emptyRow()]
        return
      }

      try {
        const bridge = getBridge()
        const json = await bridge.GetWorkoutDetailsByDate(this.date)
        const rows = parseJson(json, [])
        this.workoutList = (Array.isArray(rows) && rows.length > 0) ? rows : [this.emptyRow()]
      } catch (e) {
        this.workoutList = [this.emptyRow()]
      }
    },

    addLine() {
      this.workoutList.push(this.emptyRow())
    },

    removeLine(index) {
      this.workoutList.splice(index, 1)
      if (this.workoutList.length === 0) this.workoutList.push(this.emptyRow())
    },

    async save() {
      if (!this.date) return

      // 最低限の入力チェック（exercise_name 空はDB側CHECKにも引っかかる）
      const trimmed = this.workoutList.map((x) => ({
        ...x,
        exercise_name: (x.exercise_name ?? '').toString().trim(),
        parts_code: (x.parts_code ?? '').toString().trim(),
      }))

      const invalid = trimmed.find((x) => !x.exercise_name || !x.parts_code)
      if (invalid) {
        alert('種目名と部位は必須です。')
        return
      }

      // C# / SQLite 向けに正規化（machine_id 0->null、CARDIOの数値null化など）
      const payload = normalizeWorkoutDetails(trimmed)

      this.saving = true
      try {
        const bridge = getBridge()
        const ok = await bridge.SaveWorkout(this.date, JSON.stringify(payload))
        alert(ok ? '保存しました' : '保存に失敗しました')
      } catch (e) {
        alert('保存に失敗しました')
      } finally {
        this.saving = false
      }
    },
  },
}
</script>
