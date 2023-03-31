<script setup lang="ts">
import { ref, computed } from 'vue';

const layout = ref('');

const parsed = computed(() => {
    try {
        return JSON.stringify(JSON.parse(atob(layout.value)), null, 2);
    } catch (error) {
        return null;
    }
});

const destination = computed(() => `/?layout=${layout.value}`);

</script>
<template>
    <div class="no-layout">
        <div>
            No layout or invalid layout supplied. Please supply a layout below
        </div>
        <div class="mt5 row">
            <div>
                <textarea id="no-layout-editor" v-model="layout" />
            </div>
            <div>
                <pre v-if="parsed">{{ parsed }}</pre>
                <pre v-else>Invalid layout</pre>
            </div>
        </div>
        <div class="mt5">
            <a :href="destination">Click here to navigate to the layout</a>
        </div>
    </div>
</template>

<style scoped>
.no-layout {
    margin: 50px auto;
    width: 100%;
    max-width: 1200px;
}

.row {
    display: flex;
}

.row>div {
    flex-grow: 1;
    box-sizing: border-box;
    padding: 15px;
}

.no-layout textarea {
    width: 100%;
    height: 100%;
    min-height: 200px;
}

pre {
    font-family: monospace;
}
</style>
