<template>
  <v-toolbar
    color="primary"
    flat
    dark
    elevation="0"
    style="flex: none;"
  >
    <v-btn
      icon
      dark
      @click="toggle"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title>
      {{ title }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      Type: String,
      default: null,
      require: true
    }
  },
  methods: {
    toggle() {
      return this.$emit('toggle');
    }
  }
}
</script>