<script setup lang="ts">
import { inject, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import ContainerRenderer from '../components/ContainerRenderer.vue';
import { storageKey } from '../injectionKeys';
import { LayoutProfile, loadProfile } from '../profiles';

const route = useRoute();
const profileUuid = route.params.layout as string;

const profile = ref<LayoutProfile | null>(null);
const storage = inject(storageKey, ()  => localStorage, true);

onBeforeMount(() => {
    try {
        profile.value = loadProfile(profileUuid, storage);
    } catch (error) {
        return;
    }
});

</script>

<template>
    <div class="fullpage" v-if="profile">
        <div>Using profile: {{ profile.name }}</div>
        <ContainerRenderer :layout="profile.layout" />
    </div>
    <div v-else>404</div>
</template>

<style scoped>
.fullpage {
    height: 100%;
}
</style>
