import ROUTE from '@resources/route.js'
import _ from 'lodash'

/**
 * Breadcrumb list for route name
 * (kept for backwards-compat)
 */
export function getbreadcrumb(target) {
  return _.get(_.find(ROUTE, { name: target }), 'meta.breadcrumb', [])
}

/**
 * WebView2 bridge getter (throws if missing)
 */
export function getBridge() {
  const bridge = (window && window.chrome && window.chrome.webview && window.chrome.webview.hostObjects && window.chrome.webview.hostObjects.bridge) ? window.chrome.webview.hostObjects.bridge : null
  if (!bridge) {
    throw new Error('WebView2 bridge is not available. (window.chrome.webview.hostObjects.bridge)')
  }
  return bridge
}

/**
 * Safe JSON.parse helper
 */
export function parseJson(json, fallback = null) {
  try {
    return JSON.parse(json)
  } catch (e) {
    return fallback
  }
}

/**
 * Convert input to nullable number (''/null/undefined/NaN => null)
 */
export function toNullableNumber(v) {
  if (v === '' || v === null || v === undefined) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

/**
 * Convert input to nullable int (''/null/undefined/NaN => null)
 */
export function toNullableInt(v) {
  const n = toNullableNumber(v)
  return n === null ? null : Math.trunc(n)
}

/**
 * Normalize workout details payload to match C# / SQLite expectations.
 * - trims strings
 * - machine_id: 0/negative => null
 * - CARDIO: weight/reps/sets => null
 * - empty numeric => null
 */
export function normalizeWorkoutDetails(list) {
  const safe = Array.isArray(list) ? list : []
  return safe.map((x) => {
    const parts = (x.parts_code ?? '').toString().trim()
    const isCardio = parts.toUpperCase() === 'CARDIO'

    const machineId = toNullableInt(x.machine_id)
    const normalizedMachineId = machineId && machineId > 0 ? machineId : null

    const weight = isCardio ? null : toNullableNumber(x.weight)
    const reps = isCardio ? null : toNullableInt(x.reps)
    const sets = isCardio ? null : toNullableInt(x.sets)

    return {
      // keep id if present (editing)
      id: x.id ?? 0,
      session_id: x.session_id ?? 0,

      machine_id: normalizedMachineId,
      exercise_name: (x.exercise_name ?? '').toString().trim(),
      parts_code: parts,

      weight,
      reps,
      sets,

      memo: (x.memo ?? null) === '' ? null : x.memo ?? null,
    }
  })
}
