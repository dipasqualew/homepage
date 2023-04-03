<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import { Favourite } from '../profiles';

interface Props {
  bookmark: Favourite
  editMode: boolean;
}


const props = withDefaults(defineProps<Props>(), { editMode: false });

/**
 * The component to use for the big card
 */
const component = computed(() => props.editMode ? 'div' : 'a');

/**
 * The index of the row that is currently selected
 */
const selectedIndex = ref(0);

/**
 * The currently selected row
 */
const selected = computed(() => props.bookmark.rows[selectedIndex.value]);

/**
 * Set up the row marked as default
 * or the first one if none is marked as default
 */
onBeforeMount(() => {
    for (let i = 0; i < props.bookmark.rows.length; i++) {
        if (props.bookmark.rows[i].default) {
            selectedIndex.value = i;
            break;
        }
    }
});

/**
 * Focus the card when the mouse enters it
 *
 * @param event
 */
const onMouseEnter = (event: MouseEvent) => {
    if (props.editMode) {
        return;
    }

    const target = event.target as HTMLElement;

    target.focus();
};

/**
 * Blur the card when the mouse leaves it.
 *
 * This is necessary to avoid focus animation
 * once the mouse leaves the card.
 *
 * @param event
 */
const onMouseLeave = (event: MouseEvent) => {
    if (props.editMode) {
        return;
    }

    const target = event.target as HTMLElement;

    target.blur();
};

/**
 * Switch the selected row when the user presses the up or down arrow
 *
 * @param event
 */
const switchSelected = (event: KeyboardEvent) => {
    if (props.editMode || props.bookmark.rows.length <= 1) {
        return;
    }

    if (event.key === 'ArrowUp' || event.key === 'w') {
        if(selectedIndex.value > 0) {
            selectedIndex.value--;
        }
    }

    if (event.key === 'ArrowDown' || event.key === 's') {
        if(selectedIndex.value < props.bookmark.rows.length - 1) {
            selectedIndex.value++;
        }
    }
};

</script>

<template>
  <component
    :is="component" class="big-card"
    :class="props.editMode ? '' : 'no-edit-mode'"
    :href="selected.url"
    :test-item-id="`big-card-${props.bookmark.label}`"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @keyup="switchSelected">
    <div class="big-card-content">
      <div class="icon-container"><img :src="props.bookmark.icon" /></div>
      <div v-for="row in props.bookmark.rows" :key="row.title">
        <div class="label" :class="row.url === selected.url ? 'selected' : ''">
          <span v-if="row.url === selected.url">→ </span>
          <span v-else>&nbsp;&nbsp;</span>
          <span>{{ props.bookmark.label }}</span>
          <span v-if="row.title">:{{  row.title }}</span>
        </div>
      </div>
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
  background-color: rgb(238, 238, 238);
}

.big-card-content {
  text-align: center;
  margin: auto;
  font-size: 1.5em;
  width: 100%
}

.label {
  font-family: monospace;
  text-decoration: none;
  color: lightgray;
}

.label.selected {
  color: #6797da;
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

