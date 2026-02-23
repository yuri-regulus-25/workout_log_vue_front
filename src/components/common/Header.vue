<template>
    <v-toolbar color="header" flat dark elevation="0" style="flex: none;">
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
    }
}
</script>