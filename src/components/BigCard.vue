<script setup lang="ts">
import { computed } from 'vue';


interface Props {
  title: string;
  url: string;
  icon: string;
  disableLinks: boolean;
}

const props = defineProps<Props>();

const component = computed(() => props.disableLinks ? 'div' : 'a');

</script>

<template>
  <component :is="component" class="big-card" :href="url">
    <div class="big-card-content">
      <div><img :src="icon" /></div>
      <div class="label"><span>{{ title }}</span></div>
    </div>
  </component>
</template>

<style scoped>
.big-card {
  width: 100%;
  min-width: 100px;
  min-height: 100px;
  height: 100%;
  flex: 1;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 1s;
}

.big-card:hover {
  background-color: lightgray;
}

.big-card-content {
  text-align: center;
  margin: auto;
  font-size: x-large;
}

.label {
  margin-top: 15px;
}

.big-card img {
  width: 100px;
}
</style>
