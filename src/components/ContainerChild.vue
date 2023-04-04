<script setup lang="ts">
import { computed } from 'vue';

import BigCard from './BigCard.vue';
import { BlockOptions } from '../profiles';

interface Props {
    container: BlockOptions;
    currentUuid: string;
    editMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), { editMode: false, prefix: 'root' });

const style = computed(() => {
    if (props.editMode) {
        const containerStyles = {
            'margin': '1px',
            'background-color': 'white',
            'outline': '2px solid black',
            'padding': '15px',
        };

        if (props.currentUuid === props.container.uuid) {
            containerStyles['background-color'] = 'lightgray';
            containerStyles['outline'] = '2px solid blue';
        }

        return containerStyles;
    }

    return {};
});

</script>
<template>
    <BigCard
        v-if="props.container.type === 'big-card'"
        :style="style"
        :bookmark="props.container.bookmark"
        :edit-mode="editMode"
        :data-item-uuid="props.container.uuid"
    />
    <div v-else class="container child" :class="props.container.direction" :style="style" :data-item-uuid="props.container.uuid">
        <ContainerChild
            v-for="child, i in props.container.children" :key="i"
            :container="child"
            :current-uuid="currentUuid"
            :edit-mode="editMode"
        />
    </div>
</template>

<style scoped>
/* Row and Column styling */
.row, .column {
  display: flex;
  transition: background-color 1s;
  width: 100%;
}

/* Column direction */
.column {
  flex-direction: column;
}

/* Child element styling */
.row > div,
.column > div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  position: relative;
}

/* Make nested elements inherit row/column styling */
.row > .row,
.row > .column,
.column > .row,
.column > .column {
  justify-content: normal;
  align-items: normal;
  border: none;
}

</style>
