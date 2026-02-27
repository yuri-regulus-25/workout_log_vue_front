export default [
  // ダッシュボード
  {
    path: "/",
    name: "dashboard",
    component: () => import("@components/dashboard/App.vue"),
    meta: {
      title: "ダッシュボード",
      breadcrumb: ["dashboard"]
    },
    icon: "mdi-view-dashboard"
  },

  {
    path: "/workout/edit/:date",
    name: "workout_edit",
    component: () => import("@components/workout/edit/App.vue"),
    meta: {
      title: "登録",
      breadcrumb: ["dashboard", "workout", "workout_edit"]
    },
    icon: "mdi-plus"
  },

  // URL異常(404)
  {
    path: "*",
    name: "notfound",
    component: () => import("@components/Error/NotFound.vue"),
    meta: {
      title: "Error - HTTP 404 Not Found"
    },
    showNav: false
  }
]