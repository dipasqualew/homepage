<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import ContainerRoot from '../components/ContainerRoot.vue';
import { FeedbackError } from '../errors';
import { useMeta, useStorage } from '../hooks';
import { Layout } from '../profiles';
import { createProfile, loadProfile, saveProfile } from '../profiles';
import { RouteName } from '../router';

interface Props {
    profileUuid?: string | null;
}

const meta = useMeta();
const router = useRouter();
const storage = useStorage();

const props = withDefaults(defineProps<Props>(), {
    profileUuid: null,
});

const profile = ref<Layout | null>(null);

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
        profile.value = value;
    }
});

const commitProfile = () => {
    if (!profile.value) {
        throw new Error('Profile not loaded.');
    }

    // Ignore all new profiles
    if (props.profileUuid)

        // If the profile is not new, ensure the UUID has not been changed
        if( props.profileUuid !== profile.value.uuid) {
            throw new FeedbackError('Profile UUID cannot be changed.');
        }

    saveProfile(profile.value, storage);

    router.push({ name: RouteName.LAYOUT, params: { profileUuid: profile.value.uuid } });
};

const updateProfile = (layout: Layout) => {
    profile.value = layout;
    rawLayout.value = JSON.stringify(profile.value, null, 2);

    saveProfile(profile.value, storage);
};

onBeforeMount(() => {
    if (props.profileUuid) {
        try {
            const existingProfile = loadProfile(props.profileUuid, storage);
            profile.value = existingProfile;
            meta.title.value = `Edit Profile: ${profile.value.name}`;
            rawLayout.value = JSON.stringify(profile.value, null, 2);
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
                        <div class="contain-textarea">
                            <v-textarea label="Layout Code" variant="outlined" v-model="rawLayout" id="no-layout-editor" auto-grow></v-textarea>
                        </div>
                    </div>
                </v-col>
                <v-col>
                    <div v-if="parsedLayout" class="layout">
                        <ContainerRoot :layout="parsedLayout" :edit-mode="true" @update-profile="updateProfile" />
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
.layout {
    min-height: 50vh;
}
.contain-textarea {
    max-height: 50vh;
    overflow-y: auto;
    padding-top: 5px;
}
</style>
