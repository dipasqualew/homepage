<script setup lang="ts">
import BigCard from "./BigCard.vue";
import Flex from './Flex.vue';
import { Favourite } from '../favourites';

interface BigCard {
    block: "big-card";
    favourite: Favourite;
};

interface Container {
    block: "row" | "column" | "root";
    children: Array<Container | BigCard>
};

type Layout = BigCard | Container

interface Props {
    layout: Layout
};

const { layout } = defineProps<Props>();

</script>
<template>
    <BigCard v-if="layout.block === 'big-card'" v-bind="layout.favourite" />
    <div v-else-if="layout.block === 'root'">
        <Renderer v-for="child in layout.children" :layout="child" />
    </div>
    <Flex v-else :direction="layout.block">
        <Renderer v-for="child in layout.children" :layout="child" />
    </Flex>
</template>
