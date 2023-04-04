<script setup lang="ts">
import { useFeedback } from '../../hooks';

const { userFeedbacks, removeFeedback } = useFeedback();

const calculateStyles = (index: number) => {
    return {
        bottom: `${index * 60}px`,
        transition: 'bottom 0.5s ease-in-out',
    };
};

</script>
<template>
    <div data-testid="user-feedback-container" id="user-feedback-container">
        <v-snackbar
            v-for="feedback, i in userFeedbacks" :key="feedback.uuid"
            attach="#user-feedback-container"
            :color="feedback.color"
            @update:modelValue="removeFeedback(feedback.uuid)"
            :modelValue="!!feedback.uuid"
            :timeout="feedback.timeout"
            :style="calculateStyles(i)"
            :data-testid="`user-feedback-${feedback.uuid}`"
        >
        {{ feedback.message }}
    </v-snackbar>
    </div>
</template>
