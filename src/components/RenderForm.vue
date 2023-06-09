<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import { BlockOptions, Bookmark } from '../profiles';

const emit = defineEmits(['profileAction', 'close']);

interface ContainerPath<T extends BlockOptions = BlockOptions> {
    container: T,
    position: string;
}

interface Props {
    path: ContainerPath[];
}

const props = defineProps<Props>();
const action = ref('');

const bookmark = ref<Bookmark>({
    label: '',
    icon: '',
    rows: [
        {
            title: '',
            url: '',
        }
    ],
});

const target = computed(() => props.path[props.path.length - 1]);
const block = computed(() => target.value.container);

const breadcrumb = computed(() => {
    return props.path.map((item) => item.position).join(' > ');
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

onBeforeMount(() => {
    if (block.value.type === 'big-card') {
        // populate bookmar.value with a deep clone of the given bookmark
        bookmark.value = JSON.parse(JSON.stringify(block.value.bookmark));
    }
});

const actions = computed(() => {
    if (block.value.type === 'big-card') {
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

const onClose = () => emit('close');

const addRow = () => {
    bookmark.value.rows.push({
        title: '',
        url: '',
    });
};

const removeRow = (index: number) => {
    bookmark.value.rows.splice(index, 1);
};

</script>
<template>
<v-sheet width="100%" class="render-form">
    <v-container>
        <v-row>
            Editing {{ breadcrumb }}
        </v-row>
        <v-row>
            <v-col>
                <v-select
                    label="Select Action"
                    data-testid="profile-select-action"
                    :items="actions"
                    v-model="action"
                    ></v-select>
            </v-col>
            <v-col>
                <div v-if="action === 'add-bookmark' || action === 'edit-bookmark'">
                    <v-btn color="blue" @click="addRow">Add Row</v-btn>
                    <v-text-field label="Label" variant="outlined" v-model="bookmark.label"></v-text-field>
                    <v-text-field label="Icon" variant="outlined" v-model="bookmark.icon"></v-text-field>

                    <div v-for="row, index in bookmark.rows" :key="row.url">
                        <v-text-field label="Title (Optional)" variant="outlined" v-model="row.title"></v-text-field>
                        <v-text-field label="URL" variant="outlined" v-model="row.url"></v-text-field>
                        <v-btn v-if="bookmark.rows.length > 1" color="red" @click="removeRow(index)">Remove Row</v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-btn color="blue" @click="onConfirm">Confirm</v-btn>
            <v-btn color="red" @click="onClose">Cancel</v-btn>
        </v-row>
    </v-container>


</v-sheet>
</template>

<style scoped>
.render-form {
    padding: 15px;
}
</style>
