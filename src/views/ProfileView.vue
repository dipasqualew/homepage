<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import ContainerRoot from '../components/ContainerRoot.vue';
import { useMeta, useStorage } from '../hooks';
import { Profile, loadProfile } from '../profiles';

interface Props {
    profileUuid?: string | null;
}

const storage = useStorage();
const meta = useMeta();

const props = withDefaults(defineProps<Props>(), {
    profileUuid: null,
});

const profile = ref<Profile | null>(null);


onBeforeMount(() => {
    try {
        if (!props.profileUuid) {
            throw new Error('Profile not loaded.');
        }

        profile.value = loadProfile(props.profileUuid, storage);
        meta.title.value = `Profile: ${profile.value?.name ?? '404'}`;
    } catch (error) {
        meta.title.value = 'Profile: 404';
        return;
    }
});

</script>

<template>
    <div class="fullpage" v-if="profile">
        <ContainerRoot :profile="profile" />
    </div>
    <div v-else class="text-h3 text-center pt-5">Profile not found!</div>
</template>
