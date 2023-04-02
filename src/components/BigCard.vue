<script setup lang="ts">
import { computed } from 'vue';


interface Props {
  title: string;
  url: string;
  icon: string;
  editMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), { editMode: false });

const component = computed(() => props.editMode ? 'div' : 'a');

</script>

<template>
  <component :is="component" class="big-card" :class="props.editMode ? '' : 'no-edit-mode'" :href="url">
    <div class="big-card-content">
      <div class="icon-container"><img :src="icon" /></div>
      <div class="label"><span>{{ title }}</span></div>
    </div>
  </component>
</template>

<style>
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
  text-decoration: none;
  color: black;
}

.no-edit-mode {
  transition: background-color 1s;
}

.no-edit-mode:hover {
  background-color: lightgray;
}

.big-card-content {
  text-align: center;
  margin: auto;
  font-size: 1.5em;
  width: 100%
}

.label {
  margin-top: 15px;
}

.icon-container {
  width: 20%;
  margin: auto;
}
.icon-container img {
  width: 100%;
  object-fit: contain;
}
</style>
