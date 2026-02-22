<template>
  <v-app>
    <v-card>
      <v-card-title>サンプルだよぉ</v-card-title>
      <v-card-text>
        C#との通信を確認します
        <v-btn @click="callBackendMethods()">呼んでみる?</v-btn>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),

  methods: {
    async callBackendMethods() {
      const bridge = window.chrome.webview.hostObjects.bridge; 
      await bridge.MsgBox("引数だよぉ");
    }
  }
};
</script>
