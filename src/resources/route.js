import Home from "@components/home/App.vue";

export default [
    // ホーム画面
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: "Home"
        }
    },

    // URL異常(404)
    {
        path: "*",
        name: "notfound",
        component: () => import("@components/Error/NotFound.vue"),
        meta: {
            title: "Error - HTTP 404 Not Found"
        }
    }
]