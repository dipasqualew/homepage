<script setup lang="ts">
import BigCard from './BigCard.vue';
import FlexContainer from './FlexContainer.vue';
import { Favourite } from '../favourites';

interface BigCardProp {
    block: 'big-card';
    favourite: Favourite;
}

interface Container {
    block: 'row' | 'column' | 'root';
    children: Array<Container | BigCardProp>
}

type Layout = BigCardProp | Container

interface Props {
    layout: Layout
}

const props = defineProps<Props>();

</script>
<template>
    <BigCard v-if="props.layout.block === 'big-card'" v-bind="props.layout.favourite" />
    <div v-else-if="props.layout.block === 'root'">
        <ContainerRenderer v-for="child, i in props.layout.children" :layout="child" :key="i" />
    </div>
    <FlexContainer v-else :direction="props.layout.block">
        <ContainerRenderer v-for="child, i in props.layout.children" :layout="child" :key="i" />
    </FlexContainer>
</template>
