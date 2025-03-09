<template>
    <div class="design">
        <left-menu :templates="templates"></left-menu>
        <design-main
            :templates="templates"
            :globalStyle="globalStyle"
            @edit-template="editTemplate"
        ></design-main>
        <right-menu
            :templates="templates"
            :globalStyle="globalStyle"
            :template-edit-index="templateEditIndex"
        ></right-menu>
    </div>
</template>

<script setup lang="ts">
import leftMenu from './components/left-menu.vue';
import rightMenu from './components/right-menu.vue';
import designMain from './components/design-main.vue';
import { defaultGlobalStyle } from '@/schema/default';
import { ref } from 'vue';
import useUserStore from '@/store/user';

const userStore = useUserStore();
const templates = userStore.resume;
const templateEditIndex = ref<number>(-1);
const globalStyle = defaultGlobalStyle;

function editTemplate(index: number) {
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
