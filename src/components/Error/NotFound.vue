<template>
  <v-container fill-height>
    <v-card
      flat
      class="mx-auto"
    >
      <v-card-text>
        <v-icon
          color="error"
          large
          class="mr-3"
          >mdi-alert-circle</v-icon
        >
        <span>URL不正です。URLを見直してください。</span><br />
        <v-btn
          color="primary"
          dark
          to="/"
          class="mt-5"
          >ホームへ</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {}
</script>

<style></style>
