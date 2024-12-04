<template>
    <div class="design">
        <left-menu :templates="templates"></left-menu>
        <design-main :templates="templates"></design-main>
        <right-menu></right-menu>
    </div>
</template>

<script setup lang="ts">
import leftMenu from './components/left-menu.vue';
import rightMenu from './components/right-menu.vue';
import designMain from './components/design-main.vue';
import { defaultTemplates } from '@/schema/default';

const templates = defaultTemplates;
</script>

<style lang="scss" scoped>
.design {
    width: 100vw;
    height: 100vh;
    padding-top: 60px;
    overflow: hidden;
    display: flex;
}
</style>
