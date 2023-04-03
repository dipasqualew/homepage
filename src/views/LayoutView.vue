<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import ContainerRoot from '../components/ContainerRoot.vue';
import { useMeta, useStorage } from '../hooks';
import { Layout, loadProfile } from '../profiles';

interface Props {
    profileUuid?: string | null;
}

const storage = useStorage();
const meta = useMeta();

const props = withDefaults(defineProps<Props>(), {
    profileUuid: null,
});

const profile = ref<Layout | null>(null);


onBeforeMount(() => {
    try {
        if (!props.profileUuid) {
            throw new Error('Profile not loaded.');
        }

        profile.value = loadProfile(props.profileUuid, storage);
        meta.title.value = `Layout Profile: ${profile.value?.name ?? '404'}`;
    } catch (error) {
        meta.title.value = 'Layout Profile: 404';
        return;
    }
});

</script>

<template>
    <div class="fullpage" v-if="profile">
        <ContainerRoot :layout="profile" />
    </div>
    <div v-else class="text-h3 text-center pt-5">Layout Profile not found!</div>
</template>
