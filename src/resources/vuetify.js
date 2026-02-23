import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { commonColors } from '@resources/colors.js'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false, // 初期状態
    themes: {
      light: {
        ...commonColors,
      },
      dark: {
        ...commonColors,
      },
    },
  },
});