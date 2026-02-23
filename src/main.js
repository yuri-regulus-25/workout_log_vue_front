import Vue from 'vue'
import App from '@components/App.vue'
import vuetify from '@resources/vuetify.js'
import VueRouter from 'vue-router'
import routes from "@resources/route.js"
import _ from "lodash";
import moment from "moment";

Vue.prototype._ = _;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')