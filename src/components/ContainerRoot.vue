<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed, ref } from 'vue';

import ContainerChild from './ContainerChild.vue';
import RenderForm from './RenderForm.vue';
import { BlockOptions, Bookmark, Container, Profile } from '../profiles';


const emit = defineEmits(['updateProfile']);


interface Props {
    profile: Profile;
    editMode?: boolean;
}

interface ContainerPath<T extends BlockOptions = BlockOptions> {
    container: T,
    position: string;
}

const props = withDefaults(defineProps<Props>(), { editMode: false, prefix: 'root' });

const currentUuid = ref('');
const currentPath = computed(() => {
    const path = getContainerByUuid([{ container: props.profile.root, position: 'root' }], currentUuid.value);

    return path;
});

const currentTooltip = computed(() => {
    if (currentPath.value.length === 0) {
        return '';
    }

    const path = currentPath.value.map((item) => item.position).join(' > ');

    return path;
});

const dialog = ref<{ active: boolean, path: ContainerPath[], itemUuid: string }>({
    active: false,
    path: [],
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

        const path = getContainerByUuid([{ container: props.profile.root, position: 'root' }], itemUuid);

        dialog.value = {
            active: true,
            itemUuid,
            path,
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

const getContainerByUuid = (
    path: ContainerPath[],
    uuid: string
): ContainerPath[] => {
    const parent = path[path.length - 1];

    if (parent.container) {
        if (parent.container.uuid === uuid) {
            return path;
        }

        if (parent.container.type === 'container') {
            for (let index = 0; index < parent.container.children.length; index++) {
                const child = parent.container.children[index];
                let position = '';

                if (child.type === 'big-card') {
                    position = `bookmark:${child.bookmark.label}`;
                } else {
                    position = `${parent.container.direction}:${index}`;
                }

                const result = getContainerByUuid([...path, { container: child, position }], uuid);

                if (result.length) {
                    return result;
                }
            }
        }
    }

    return [];
};

const onCloseRenderForm = () => {
    dialog.value.active = false;
    dialog.value.path = [];
    dialog.value.itemUuid = '';
};

const onProfileAction = (context: { action: string, bookmark: Bookmark }) => {
    const path = getContainerByUuid([{ container: props.profile.root, position: 'root' }], dialog.value.itemUuid);
    const target = path[path.length - 1];
    const parent = path[path.length - 2] as ContainerPath<Container>;

    if (!target) {
        throw new Error('Target not found');
    }

    if (target.container.type === 'big-card') {
        if (!parent) {
            throw new Error('Parent nto found');
        }

        if (context.action === 'edit-bookmark') {
            target.container.bookmark = context.bookmark;
        }

        if (context.action === 'remove-bookmark') {
            const index = parent.container.children.findIndex((child) => child.uuid === dialog.value.itemUuid);
            parent.container.children.splice(index, 1);
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
            if (!parent) {
                throw new Error('Parent not found');
            }
            const index = parent.container.children.findIndex((child) => child.uuid === dialog.value.itemUuid);
            parent.container.children.splice(index, 1);
        }

        if (context.action === 'add-bookmark') {
            target.container.children.push({
                uuid: uuidv4(),
                type: 'big-card',
                bookmark: context.bookmark,
            });
        }
    }

    onCloseRenderForm();

    emit('updateProfile', props.profile);
};

</script>
<template>
    <div
        data-testid="profile-visual-editor"
        :data-item-uuid="props.profile.uuid"
        @click="onClick"
        @mouseover="onHover"
        @mouseleave="currentUuid = ''"
        class="container-root">
        <v-tooltip
            :v-model="currentTooltip"
            activator="parent"
            location="top"
            data-testid="current-path"
        >
        {{ currentTooltip }}
        </v-tooltip>
        <ContainerChild
            :container="props.profile.root"
            :current-uuid="currentUuid"
            :edit-mode="editMode"
            name="root"
        />
    </div>
    <v-dialog v-model="dialog.active" width="60vw">
        <RenderForm
            @profile-action="onProfileAction"
            @close="onCloseRenderForm"
            :path="dialog.path" />
    </v-dialog>
</template>

<style scoped>
.container-root {
    width: 100%;
    min-height: 100%;
    display: flex;
}
</style>
