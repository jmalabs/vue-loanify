<template>
    <v-overlay v-model="isLoading" class="center-content">
        <v-progress-circular :size="70" :width="7" indeterminate></v-progress-circular>
    </v-overlay>
</template>

<script>

import { computed } from 'vue'
export default {
    props: {
        isLoading: Boolean
    },
    setup(props) {

        const isLoading = computed(() => { return props.isLoading })
        return {
            isLoading
        }
    },
};
</script>
<style scoped>
.center-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>