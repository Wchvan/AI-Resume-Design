<template>
    <div class="design">
        <left-menu></left-menu>
        <design-main></design-main>
        <right-menu></right-menu>
    </div>
</template>

<script setup lang="ts">
import leftMenu from './components/left-menu.vue';
import rightMenu from './components/right-menu.vue';
import designMain from './components/design-main.vue';
const templates = [
    {
        name: '',
    },
];
</script>

<style lang="scss" scoped>
.design {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
}
</style>
