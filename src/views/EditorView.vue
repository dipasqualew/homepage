<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ContainerRenderer from '../components/ContainerRenderer.vue';
import { useMeta, useStorage } from '../hooks';
import { Layout, LayoutProfile } from '../profiles';
import { createProfile, loadProfile, saveProfile } from '../profiles';

const meta = useMeta();
const route = useRoute();
const router = useRouter();
const storage = useStorage();

const routeProfileUuid = (route.params.profile as string) || null;

const profile = ref<LayoutProfile | null>(null);

const rawLayout = ref('');

const parsedLayout = computed(() => {
    try {
        return JSON.parse(rawLayout.value) as Layout;
    } catch (error) {
        return null;
    }
});

watch(parsedLayout, (value) => {
    if (profile.value && value) {
        profile.value.layout = value;
    }
});

const commitProfile = () => {
    if (!profile.value) {
        throw new Error('Profile not loaded.');
    }

    saveProfile(profile.value, storage);

    router.push({ name: 'Layout', params: { layout: profile.value.uuid } });
};

onBeforeMount(() => {
    if (routeProfileUuid) {
        try {
            const existingProfile = loadProfile(routeProfileUuid, storage);
            profile.value = existingProfile;
            meta.title.value = `Edit Profile: ${profile.value.name}`;
            rawLayout.value = JSON.stringify(profile.value.layout, null, 2);
        } catch (error) {
            meta.title.value = 'Profile not found.';
        }
    } else {
        profile.value = createProfile({});
        meta.title.value = 'Create a new Layout Profile';
    }
});

</script>
<template>
    <div v-if="profile">
        <v-container>
            <v-row>
                <v-col>
                    <div>
                        <v-text-field label="Profile Name" variant="outlined" v-model="profile.name"></v-text-field>
                        <v-textarea label="Layout Code" variant="outlined" v-model="rawLayout" id="no-layout-editor" auto-grow></v-textarea>
                    </div>
                </v-col>
                <v-col>
                    <div v-if="parsedLayout">
                        <ContainerRenderer :layout="parsedLayout" :disableLinks="true" class="height-50vh"/>
                    </div>
                    <div v-else>
                        <v-alert type="error" prominent>
                            Invalid layout
                        </v-alert>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn :disabled="!parsedLayout || !profile.name" variant="tonal" @click="commitProfile" color="indigo">
                        Commit
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else>
        <v-alert type="error" prominent>
            Layout Profile not found!
        </v-alert>
    </div>
</template>

<style scoped>
.height-50vh {
    height: 50vh;
}
</style>
