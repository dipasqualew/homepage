<script setup lang="ts">
import { inject, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import ContainerRenderer from '../components/ContainerRenderer.vue';
import { useMeta } from '../hooks';
import { storageKey } from '../injectionKeys';
import { LayoutProfile, loadProfile } from '../profiles';

const route = useRoute();
const profileUuid = route.params.layout as string;

const profile = ref<LayoutProfile | null>(null);
const storage = inject(storageKey, ()  => localStorage, true);
const meta = useMeta();

onBeforeMount(() => {
    try {
        profile.value = loadProfile(profileUuid, storage);
        meta.title.value = `Layout Profile: ${profile.value?.name ?? '404'}`;
    } catch (error) {
        meta.title.value = 'Layout Profile: 404';
        return;
    }
});

</script>

<template>
    <div class="fullpage" v-if="profile">
        <ContainerRenderer :layout="profile.layout" />
    </div>
    <div v-else class="text-h3 text-center pt-5">Layout Profile not found!</div>
</template>
