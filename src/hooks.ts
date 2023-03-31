import { ref } from 'vue';

const title = ref('');

export const useMeta = () => {
    return {
        title,
    };
};
