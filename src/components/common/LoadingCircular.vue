<template>
    <v-overlay :value="value" :z-index="zIndex" :opacity="opacity">
        <div class="d-flex flex-column align-center">
            <v-progress-circular indeterminate :size="size" :width="width" :color="color" />
            <div v-if="text" class="mt-4 white--text">{{ text }}</div>
        </div>
    </v-overlay>
</template>

<script>
export default {
    props: {
        value: { type: Boolean, default: false }, // v-model (Vue2) の受け口
        text: { type: String, default: "Loading..." },
        color: { type: String, default: "white" },
        size: { type: [Number, String], default: 105 },
        width: { type: [Number, String], default: 6 },
        opacity: { type: [Number, String], default: 0.6 },
        zIndex: { type: [Number, String], default: 9999 },
    },
};
</script>