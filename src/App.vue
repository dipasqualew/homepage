<script setup lang="ts">
import BigCard from './components/BigCard.vue';
import { ref } from 'vue';
import { Favourite, FAVOURITES } from './favourites';
import Flex from './components/Flex.vue';


const favourites = ref<Record<string, Favourite>>(FAVOURITES);
</script>

<template>
  <Flex direction="row">
    <Flex direction="column">
      <BigCard v-bind="FAVOURITES.gmail" />
      <BigCard v-bind="FAVOURITES.gdrive" />
      <BigCard v-bind="FAVOURITES.gcalendar" />
    </Flex>
    <BigCard v-bind="FAVOURITES.chatgpt" />
    <BigCard v-bind="FAVOURITES.onepassword" />
  </Flex>
</template>

