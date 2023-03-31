<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

import ContainerRenderer from '../components/ContainerRenderer.vue';
import { useMeta } from '../hooks';
import { storageKey } from '../injectionKeys';
import { Layout } from '../profiles';
import { createProfile, saveProfile } from '../profiles';


const profileName = ref('');
const layout = ref('');

const parsed = computed(() => {
    try {
        return JSON.parse(layout.value);
    } catch (error) {
        return null;
    }
});

const storage = inject(storageKey, ()  => localStorage, true);

const router = useRouter();

const commitProfile = () => {
    if (!parsed.value) {
        throw new Error('Cannot save invalid layout.');
    }

    const profile = createProfile(profileName.value, parsed as unknown as Layout);

    saveProfile(profile, storage);

    router.push({ name: 'Layout', params: { layout: profile.uuid } });
};

const meta = useMeta();
meta.title.value = 'Create a new Layout Profile';

</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <div>
                    <v-text-field label="Profile Name" variant="outlined" v-model="profileName"></v-text-field>
                    <v-textarea label="Layout Code" variant="outlined" v-model="layout" id="no-layout-editor" auto-grow></v-textarea>
                </div>
            </v-col>
            <v-col>
                <div v-if="parsed">
                    <ContainerRenderer :layout="parsed" :disableLinks="true" class="height-50vh"/>
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
                <v-btn :disabled="!parsed || !profileName" variant="tonal"   @click="commitProfile" color="indigo">
                    Commit
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.height-50vh {
    height: 50vh;
}
</style>
