<script setup lang="ts">
interface Props {
    direction: 'column' | 'row';
}

defineProps<Props>();


</script>

<template>
    <div class="flexed" :class="direction">
        <slot></slot>
    </div>
</template>

<style scoped>
.flexed {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
}

.column {
    flex-direction: column;
}

.row {
    flex-direction: row;
}
</style>
