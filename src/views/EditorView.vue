<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Layout } from '../profiles';
import { createProfile, saveProfile, getLayoutProfiles, LayoutProfile } from '../profiles';

const layout = ref('');

const parsed = computed(() => {
    try {
        return JSON.stringify(JSON.parse(atob(layout.value)), null, 2);
    } catch (error) {
        return null;
    }
});

const profileName = ref('');

const router = useRouter();

const commitProfile = () => {
    if (!parsed.value) {
        throw new Error('Cannot save invalid layout.');
    }

    const profile = createProfile(profileName.value, JSON.parse(atob(layout.value)) as unknown as Layout);

    saveProfile(profile, localStorage);

    router.push({ name: 'Layout', params: { layout: profile.uuid } });
};

const allProfiles = computed(() => {
    const layoutProfiles = getLayoutProfiles(localStorage);

    const existingProfiles = Object.values(layoutProfiles.value).filter((item) => !!item) as LayoutProfile[];

    return existingProfiles;
});

</script>
<template>
    <div class="no-layout">
        <h1>Create a Layout Profile</h1>
        <div>
            <div>
                <input v-model="profileName" />
            </div>
        </div>
        <div class="mt5 row">
            <div>
                <textarea id="no-layout-editor" v-model="layout" />
            </div>
            <div>
                <pre v-if="parsed">{{ parsed }}</pre>
                <pre v-else>Invalid layout</pre>
            </div>
        </div>
        <div class="mt5">
            <button :disabled="!parsed || !profileName" @click="commitProfile">Commit</button>
        </div>
        <div v-for="existingProfile in allProfiles" :key="existingProfile.uuid">
            <RouterLink :to="{ name: 'Layout', params: { layout: existingProfile.uuid }}" >{{  existingProfile.name }}</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.no-layout {
    margin: 50px auto;
    width: 100%;
    max-width: 1200px;
}

.row {
    display: flex;
}

.row>div {
    flex-grow: 1;
    box-sizing: border-box;
    padding: 15px;
}

.no-layout textarea {
    width: 100%;
    height: 100%;
    min-height: 200px;
}

pre {
    font-family: monospace;
}
</style>
