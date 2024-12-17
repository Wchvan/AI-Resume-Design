<template>
    <div class="design">
        <left-menu :templates="templates"></left-menu>
        <design-main
            :templates="templates"
            @edit-template="editTemplate"
        ></design-main>
        <right-menu
            :templates="templates"
            :template-edit-index="templateEditIndex"
        ></right-menu>
    </div>
</template>

<script setup lang="ts">
import leftMenu from './components/left-menu.vue';
import rightMenu from './components/right-menu.vue';
import designMain from './components/design-main.vue';
import { defaultTemplates } from '@/schema/default';
import { ref } from 'vue';

const templates = defaultTemplates;
const templateEditIndex = ref<number>(1);

function editTemplate(index: number) {
    console.log(index);
    templateEditIndex.value = index;
}
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
