<template>
    <v-container>
        <v-card tile elevation="0">
            <v-card-text>
                C#との通信を確認します<br />
                <v-btn color="button" dark @click="callBackendMethods()">呼んでみる?</v-btn>
                <v-divider class="my-5" />
                Vue-Routerの動作を確認します<br />
                <v-btn color="button" dark to="/honya">飛ぶ？</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

export default {
    data() {
        return [
        ]
    },
    methods: {
        async callBackendMethods() {
            const bridge = window.chrome.webview.hostObjects.bridge;
            await bridge.MsgBox("引数だよぉ");
        },
    },
}
</script>
