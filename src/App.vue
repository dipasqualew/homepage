<script setup lang="ts">

import { computed } from 'vue';
import Renderer from './components/Renderer.vue';
import NoLayout from './components/NoLayout.vue';

const params = (new URL(document.location as unknown as URL)).searchParams;
const query = params.get('layout') || "";

console.log({ query })

const layout = computed(() => {
  try {
    return JSON.parse(atob(query))
  } catch (error) {
    console.log(error);
    return null;
  }
});

</script>

<template>
  <Renderer v-if="layout" :layout="layout" />
  <NoLayout v-else />
</template>

