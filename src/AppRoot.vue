<script setup lang="ts">
import { computed, inject } from 'vue';

import { useMeta } from './hooks';
import { storageKey } from './injectionKeys';
import { LayoutProfile, getLayoutProfiles } from './profiles';

const storage = inject(storageKey, ()  => localStorage, true);

const allProfiles = computed(() => {
    const layoutProfiles = getLayoutProfiles(storage);

    const existingProfiles = Object.values(layoutProfiles.value).filter((item) => !!item) as LayoutProfile[];

    return existingProfiles;
});


const meta = useMeta();
</script>
<template>
  <div class="root">
    <v-toolbar density="comfortable" color="black" class="toolbar">
      <h1 class="text-h6">{{  meta.title.value }}</h1>
      <v-spacer></v-spacer>
      <router-link
        v-for="existingProfile in allProfiles"
        :key="existingProfile.uuid"
        :to="{ name: 'Layout', params: { layout: existingProfile.uuid }}">
        <v-chip variant="elevated" color="gray" class="cursor-pointer">
          Profile: {{  existingProfile.name }}
        </v-chip>
      </router-link>
    </v-toolbar>
    <router-view class="router-view" />
  </div>
</template>

<style scoped>
.toolbar {
  padding: 0 1rem;
}
.cursor-pointer {
  cursor: pointer;
}
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.router-view {
  flex-grow: 1;
}
</style>
