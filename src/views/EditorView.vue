<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import ContainerRoot from '../components/ContainerRoot.vue';
import { FeedbackError } from '../errors';
import { useMeta, useStorage } from '../hooks';
import { Profile, createProfile, loadProfile, saveProfile } from '../profiles';
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

const profile = ref<Profile | null>(null);

const rawProfile = ref('');

const parsedProfile = computed(() => {
    try {
        return JSON.parse(rawProfile.value) as Profile;
    } catch (error) {
        return null;
    }
});

watch(parsedProfile, (value) => {
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

    router.push({ name: RouteName.PROFILE, params: { profileUuid: profile.value.uuid } });
};

const updateProfile = (updatedProfile: Profile) => {
    profile.value = updatedProfile;
    rawProfile.value = JSON.stringify(profile.value, null, 2);

    saveProfile(profile.value, storage);
};

onBeforeMount(() => {
    if (props.profileUuid) {
        try {
            const existingProfile = loadProfile(props.profileUuid, storage);
            profile.value = existingProfile;
            meta.title.value = `Edit Profile: ${profile.value.name}`;
            rawProfile.value = JSON.stringify(profile.value, null, 2);
        } catch (error) {
            meta.title.value = 'Profile not found.';
        }
    } else {
        profile.value = createProfile({});
        meta.title.value = 'Create a new Profile Profile';
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
                            <v-textarea label="Profile Code" variant="outlined" v-model="rawProfile" id="no-profile-editor" auto-grow></v-textarea>
                        </div>
                    </div>
                </v-col>
                <v-col>
                    <div v-if="parsedProfile" class="profile">
                        <ContainerRoot :profile="parsedProfile" :edit-mode="true" @update-profile="updateProfile" />
                    </div>
                    <div v-else>
                        <v-alert type="error" prominent>
                            Invalid profile
                        </v-alert>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn :disabled="!parsedProfile || !profile.name" variant="tonal" @click="commitProfile" color="indigo">
                        Commit
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else>
        <v-alert type="error" prominent>
            Profile Profile not found!
        </v-alert>
    </div>
</template>

<style scoped>
.profile {
    min-height: 50vh;
}
.contain-textarea {
    max-height: 50vh;
    overflow-y: auto;
    padding-top: 5px;
}
</style>
