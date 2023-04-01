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
    prefix?: string;
}

const props = withDefaults(defineProps<Props>(), { prefix: '' });

</script>
<template>
    <v-row v-if="props.layout.block === 'root'" class="root" no-gutters data-item-id="root">
        <ContainerRenderer
            v-for="child, i in props.layout.children" :key="i"
            :layout="child"
            :disable-links="disableLinks"
            :prefix="`root-row${i}`"
        />
    </v-row>
    <v-row v-else-if="props.layout.block === 'row'" no-gutters :data-item-id="props.prefix">
        <ContainerRenderer
            v-for="child, i in props.layout.children" :key="i"
            :layout="child"
            :disable-links="disableLinks"
            :prefix="`${props.prefix}-row${i}`"
        />
    </v-row>
    <v-col v-else-if="props.layout.block === 'column'" class="col" no-gutters :data-item-id="props.prefix">
        <ContainerRenderer
            v-for="child, i in props.layout.children" :key="i"
            :layout="child"
            :disable-links="disableLinks"
            :prefix="`${props.prefix}-col${i}`"
        />
    </v-col>
    <BigCard
        v-else-if="props.layout.block === 'big-card'"
        v-bind="props.layout.favourite"
        :disable-links="disableLinks"
        :prefix="props.prefix"
    />
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
