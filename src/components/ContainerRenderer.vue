<script setup lang="ts">
import BigCard from './BigCard.vue';
import { Favourite } from '../profiles';

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
    layout: Layout;
    disableLinks: boolean;
}

const props = defineProps<Props>();

</script>
<template>
    <BigCard v-if="props.layout.block === 'big-card'" v-bind="props.layout.favourite" :disable-links="disableLinks" />
    <v-row v-else-if="props.layout.block === 'root'" class="root" no-gutters>
        <ContainerRenderer v-for="child, i in props.layout.children" :layout="child" :key="i" :disable-links="disableLinks" />
    </v-row>
    <v-row v-else-if="props.layout.block === 'row'" no-gutters>
        <ContainerRenderer v-for="child, i in props.layout.children" :layout="child" :key="i" :disable-links="disableLinks" />
    </v-row>
    <v-col v-else class="col" no-gutters>
        <ContainerRenderer v-for="child, i in props.layout.children" :layout="child" :key="i" :disable-links="disableLinks" />
    </v-col>
</template>

<style scoped>
.root {
    height: 100%;
}

.col {
    display: flex;
    flex-direction: column;
}
</style>
