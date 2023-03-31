<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import ContainerRenderer from '../components/ContainerRenderer.vue';
import NoLayout from '../components/NoLayout.vue';

const route = useRoute();
const query = route.params.layout as string;

const layout = computed(() => {
    try {
        return JSON.parse(atob(query));
    } catch (error) {
        console.log(error);
        return null;
    }
});

</script>

<template>
    <ContainerRenderer v-if="layout" :layout="layout" />
    <NoLayout v-else />
</template>

