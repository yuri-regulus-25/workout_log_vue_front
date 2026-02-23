<template>
    <v-app>
        <common-header :title="pageTitle">
        </common-header>
        <v-fade-transition mode="out-in">
            <router-view />
        </v-fade-transition>
    </v-app>
</template>

<script>
import CommonHeader from "@components/common/Header.vue";

export default {
    components: {
        CommonHeader,
    },
    computed: {
        pageTitle() {
            return this.$route.meta?.title ?? "";
        },
    },
}
</script>