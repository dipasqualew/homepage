<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'

import Renderer from '../components/Renderer.vue';
import NoLayout from '../components/NoLayout.vue';

const route = useRoute()
const query = route.params.layout as string;

const layout = computed(() => {
    try {
        return JSON.parse(atob(query))
    } catch (error) {
        console.log(error);
        return null;
    }
});

</script>

<template>
    <Renderer v-if="layout" :layout="layout" />
    <NoLayout v-else />
</template>

