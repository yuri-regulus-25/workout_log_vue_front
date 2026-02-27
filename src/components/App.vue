<template>
  <v-app>
    <!-- navigation menu -->
    <v-navigation-drawer
      v-model="navigate"
      app
      temporary
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          router
          exact
          active-class="primary white--text"
          @click="navigate = false"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- header -->
    <common-header
      :title="pageTitle"
      @toggle="navigate = !navigate"
    />

    <!-- components -->
    <v-main>
      <v-container
        fluid
        class="pa-0"
      >
        <v-card
          tile
          elevation="0"
        >
          <v-card-text class="mt-3 pa-0">
            <v-fade-transition mode="out-in">
              <router-view />
            </v-fade-transition>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import _ from 'lodash'
import CommonHeader from "@components/common/Header.vue";

import ROUTES from '@resources/route.js'

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      navigate: false,
      dialog: false,
      ROUTES: ROUTES
    }
  },
  computed: {
    pageTitle() {
      return this.$route.meta?.title ?? "";
    },
    navItems() {
      return _.filter(this.ROUTES, route => route.showNav !== false);
    }
  }
}
</script>