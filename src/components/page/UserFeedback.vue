<script setup lang="ts">
import { useFeedback } from '../../hooks';

const { userFeedbacks, removeFeedback } = useFeedback();
</script>
<template>
    <div data-testid="user-feedback-container">
        <v-snackbar
            v-for="feedback in userFeedbacks" :key="feedback.uuid"
            location="bottom"
            :color="feedback.color"
            @update:modelValue="removeFeedback(feedback.uuid)"
            :modelValue="!!feedback.uuid"
            :timeout="feedback.timeout"
            :data-testid="`user-feedback-${feedback.uuid}`"
        >
        {{ feedback.message }}
    </v-snackbar>
    </div>
</template>
