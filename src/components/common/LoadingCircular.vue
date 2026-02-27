<template>
  <v-overlay
    :value="value"
    z-index="9999"
    opacity="0.6"
  >
    <div
      class="d-flex flex-column align-center"
    >
      <v-progress-circular
        indeterminate
        size="105"
        width="6"
        color="white"
      />
    </div>
  </v-overlay>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
};
</script>