<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import ContainerRenderer from '../components/ContainerRenderer.vue';
import { useMeta, useStorage } from '../hooks';
import { LayoutProfile, loadProfile } from '../profiles';

const route = useRoute();
const storage = useStorage();
const meta = useMeta();

const profileUuid = route.params.layout as string;

const profile = ref<LayoutProfile | null>(null);


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
        <ContainerRenderer :layout="profile.layout" :disable-links="false" />
    </div>
    <div v-else class="text-h3 text-center pt-5">Layout Profile not found!</div>
</template>
