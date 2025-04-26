<template>
    <div class="design">
        <left-menu :templates="templates" :timerNum="timerNum"></left-menu>
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import useUserStore from '@/store/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const templates = storeToRefs(userStore).resume;
const templateEditIndex = ref<number>(-1);
const globalStyle = defaultGlobalStyle;
const timerNum = ref(5);
const timer = setInterval(() => {
    timerNum.value -= 1;
    if (timerNum.value == 0) {
        userStore.saveResume();
        timerNum.value = 5;
    }
}, 1000);

function editTemplate(index: number) {
    templateEditIndex.value = index;
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});
onBeforeUnmount(() => {
    clearInterval(timer);
    window.removeEventListener('keydown', handleKeyDown);
});

function handleKeyDown(event: any) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        userStore.saveResume();
    } else if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        userStore.popResume();
    } else if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
        event.preventDefault();
        userStore.backResume();
    }
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
