export default [
  // ダッシュボード
  {
    path: "/",
    name: "dashboard",
    component: () => import("@components/dashboard/App.vue"),
    meta: {
      title: "ダッシュボード"
    },
    icon: "mdi-view-dashboard"
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