<script setup lang="ts">
import { computed, inject } from 'vue';

import PageToolbar from './components/page/PageToolbar.vue';
import { useMeta } from './hooks';
import { storageKey } from './injectionKeys';
import { Layout, getLayoutProfiles } from './profiles';

const storage = inject(storageKey, ()  => localStorage, true);

const allProfiles = computed(() => {
    const layoutProfiles = getLayoutProfiles(storage);

    const existingProfiles = Object.values(layoutProfiles.value).filter((item) => !!item) as Layout[];

    return existingProfiles;
});


const meta = useMeta();
</script>
<template>
  <div class="root">
    <PageToolbar :allProfiles="allProfiles" :meta="meta" />
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
