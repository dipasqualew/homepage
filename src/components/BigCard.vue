<script setup lang="ts">

interface Props {
  title: string;
  url: string;
  icon: string;
}

defineProps<Props>()

</script>

<template>
  <a class="big-card" :href="url">
    <div class="big-card-content">
      <div><img :src="icon" /></div>
      <div class="label"><span>{{ title }}</span></div>
    </div>
  </a>
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
  max-width: 100px;
}
</style>
