<template>
    <v-container fluid class="mx-0">
        <v-row dense>
            <v-col cols="12" md="9">

            </v-col>
            <v-col cols="12" md="3">
                <progress-widget />
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import ProgressWidget from '@components/home/widgets/Progress.vue';


export default {
    components: {
        ProgressWidget,
    },
    data() {
        return {
        }
    },
}
</script>
