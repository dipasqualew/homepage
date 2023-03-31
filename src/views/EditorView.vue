<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMeta } from '../hooks';
import { storageKey } from '../injectionKeys';
import { Layout } from '../profiles';
import { createProfile, saveProfile } from '../profiles';

const layout = ref('');


const parsed = computed(() => {
    try {
        return JSON.stringify(JSON.parse(atob(layout.value)), null, 2);
    } catch (error) {
        return null;
    }
});

const storage = inject(storageKey, ()  => localStorage, true);

const profileName = ref('');

const router = useRouter();

const commitProfile = () => {
    if (!parsed.value) {
        throw new Error('Cannot save invalid layout.');
    }

    const profile = createProfile(profileName.value, JSON.parse(atob(layout.value)) as unknown as Layout);

    saveProfile(profile, storage);

    router.push({ name: 'Layout', params: { layout: profile.uuid } });
};

const meta = useMeta();
meta.title.value = 'Create a new Layout Profile';

</script>
<template>
    <v-container>
        <v-row>
            <v-col class="max-height-50">
                <div>
                    <v-text-field label="Profile Name" variant="outlined" v-model="profileName"></v-text-field>
                    <v-textarea label="Label" variant="outlined" v-model="layout" id="no-layout-editor"></v-textarea>
                </div>
            </v-col>
            <v-col class="max-height-50">
                <pre v-if="parsed" class="max-height-50">{{ parsed }}</pre>
                <pre v-else>Invalid layout</pre>
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
pre {
    max-height: 50vh;
    overflow: auto;
    font-size: 14px;
}
</style>
