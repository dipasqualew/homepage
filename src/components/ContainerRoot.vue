<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

import ContainerChild from './ContainerChild.vue';
import RenderForm from './RenderForm.vue';
import { BlockOptions, Container, Favourite, Layout } from '../profiles';


const emit = defineEmits(['updateProfile']);


interface Props {
    layout: Layout;
    editMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), { editMode: false, prefix: 'root' });

const currentUuid = ref('');

const dialog = ref<{ active: boolean, container: BlockOptions | null, itemUuid: string }>({
    active: false,
    container: null,
    itemUuid: '',
});


const getItemUuid = (element: HTMLElement): string  => {
    if (element.dataset.itemUuid) {
        return element.dataset.itemUuid;
    }

    if (element.parentElement) {
        return getItemUuid(element.parentElement);
    }

    return 'root';
};

const onClick = (event: Event) => {
    if (props.editMode) {
        event.stopPropagation();
        const itemUuid = getItemUuid(event.target as HTMLElement);

        const match = getContainerByUuid(props.layout.root, itemUuid);

        dialog.value = {
            active: true,
            itemUuid,
            container: match.container,
        };
    }
};

const onHover = (event: Event) => {
    if (props.editMode) {
        event.stopPropagation();
        const itemUuid = getItemUuid(event.target as HTMLElement);

        currentUuid.value = itemUuid;
    }
};

const getContainerByUuid = (parent: Container, uuid: string): { parent: Container | null, container: BlockOptions | null } => {
    if (parent.uuid === uuid) {
        return { parent: null, container: parent } ;
    }

    for (const child of parent.children) {
        if (child.uuid === uuid) {
            return { parent, container: child };
        }

        if (child.type !== 'big-card') {
            const result = getContainerByUuid(child, uuid);
            if (result.container) {
                return result;
            }
        }
    }

    return { parent: null, container: null };
};


const onProfileAction = (context: { action: string, bookmark: Favourite }) => {
    dialog.value.active = false;
    const target = getContainerByUuid(props.layout.root, dialog.value.itemUuid);

    if (!target.container) {
        throw new Error('Target not found');
    }

    if (target.container.type === 'big-card') {
        if (!target.parent) {
            throw new Error('Parent nto found');
        }

        if (context.action === 'edit-bookmark') {
            target.container.favourite = context.bookmark;
        }

        if (context.action === 'remove-bookmark') {
            const index = target.parent.children.findIndex((child) => child.uuid === dialog.value.itemUuid);
            target.parent.children.splice(index, 1);
        }
    }

    if (target.container.type === 'container') {
        if (context.action === 'make-row') {
            target.container.direction = 'row';
        }

        if (context.action === 'make-column') {
            target.container.direction = 'column';
        }

        if (context.action === 'add-container') {
            target.container.children.push({
                uuid: uuidv4(),
                type: 'container',
                direction: 'row',
                children: [],
            });
        }

        if (context.action === 'remove-container') {
            if (!target.parent) {
                throw new Error('Target not found');
            }
            const index = target.parent.children.findIndex((child) => child.uuid === dialog.value.itemUuid);
            target.parent.children.splice(index, 1);
        }

        if (context.action === 'add-bookmark') {
            console.log(context.bookmark);
            target.container.children.push({
                uuid: uuidv4(),
                type: 'big-card',
                favourite: context.bookmark,
            });
        }
    }


    emit('updateProfile', props.layout);

};

</script>
<template>
    <div
        data-test-id="layout-visual-editor"
        :data-item-uuid="props.layout.uuid"
        @click="onClick"
        @mouseover="onHover"
        @mouseleave="currentUuid = ''"
        class="layout">
        <ContainerChild
            :container="props.layout.root"
            :current-uuid="currentUuid"
            :edit-mode="editMode"
        />
    </div>
    <v-dialog v-model="dialog.active" width="60vw">
        <RenderForm @profile-action="onProfileAction" :container="dialog.container" />
    </v-dialog>

</template>

<style scoped>
.layout {
    width: 100%;
    height: 100%;
}

.layout > div {
    height: 100%;
}
</style>
