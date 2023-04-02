<script setup lang="ts">
import { computed, ref } from 'vue';

import { BigCardBlock, Container } from '../profiles';

const emit = defineEmits(['profileAction']);

const props = defineProps<{ container: Container | BigCardBlock | null }>();
const action = ref('');

const bookmark = ref({
    title: '',
    url: '',
    icon: '',
    ...props.container?.type === 'big-card' ? props.container.favourite : {},
});

const MAKE_ROW = {
    'title': 'Transform in a row',
    'value': 'make-row'
};

const MAKE_COLUMN = {
    'title': 'Transform in a column',
    'value': 'make-column'
};


const ACTION_ADD_CONTAINER = {
    'title': 'Add container',
    'value': 'add-container'
};

const ACTION_REMOVE_CONTAINER = {
    'title': 'Remove container',
    'value': 'remove-container',
};

const ACTION_ADD_BOOKMARK = {
    'title': 'Add bookmark',
    'value': 'add-bookmark'
};

const ACTION_EDIT_BOOKMARK = {
    'title': 'Edit bookmark',
    'value': 'edit-bookmark'
};

const ACTION_REMOVE_BOOKMARK = {
    'title': 'Remove bookmark',
    'value': 'remove-bookmark'
};


const actions = computed(() => {
    if (props.container?.type === 'big-card') {
        return [ACTION_EDIT_BOOKMARK, ACTION_REMOVE_BOOKMARK];
    }

    return [MAKE_ROW, MAKE_COLUMN, ACTION_ADD_CONTAINER, ACTION_REMOVE_CONTAINER, ACTION_ADD_BOOKMARK];
});

const onConfirm = () => {
    emit('profileAction', {
        action: action.value,
        bookmark: bookmark.value,
    });
};

</script>
<template>
<v-sheet width="100%" class="render-form">
    <v-container>
        <v-row>
            Editing {{ container?.type }} - {{ container?.uuid }}
        </v-row>
        <v-row>
            <v-col>
                <v-select
                    label="Select Action"
                    data-test-id="layout-select-action"
                    :items="actions"
                    v-model="action"
                    ></v-select>
            </v-col>
            <v-col>
                <div v-if="action === 'add-bookmark' || action === 'edit-bookmark'">
                    <v-text-field label="Title" variant="outlined" v-model="bookmark.title"></v-text-field>
                    <v-text-field label="URL" variant="outlined" v-model="bookmark.url"></v-text-field>
                    <v-text-field label="Icon" variant="outlined" v-model="bookmark.icon"></v-text-field>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-btn color="blue" @click="onConfirm">Confirm</v-btn>
        </v-row>
    </v-container>


</v-sheet>
</template>

<style scoped>
.render-form {
    padding: 15px;
}
</style>
