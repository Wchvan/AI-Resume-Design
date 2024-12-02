<template>
    <div class="switch" @click="themeDark = !themeDark">
        <div class="switch-circle"></div>
        <div class="switch-body"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// theme
const themeDark = ref<boolean>(route.fullPath.includes('home'));
watch(
    () => route.fullPath,
    (newVal) => {
        if (newVal.includes('home')) {
            themeDark.value = true;
        }
    },
);
themeDark.value = sessionStorage.getItem('data-theme') === 'dark';
document.documentElement.setAttribute(
    'data-theme',
    sessionStorage.getItem('data-theme') || '',
);
watch(themeDark, (newVal) => {
    if (newVal) {
        document.documentElement.setAttribute('data-theme', 'dark');
        sessionStorage.setItem('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', '');
        sessionStorage.setItem('data-theme', '');
    }
});
</script>

<style lang="scss" scoped>
@mixin circle_color() {
    background: linear-gradient(
        180deg,
        rgba(255, 193, 35, 1) 0%,
        rgba(248, 131, 46, 1) 100%
    );
    left: 2.5px;

    [data-theme='dark'] & {
        background: linear-gradient(
            180deg,
            rgba(221, 237, 255, 1) 0%,
            rgba(52, 131, 249, 1) 100%
        );
        left: calc(60px - 20px - 2.5px);
    }
}

@mixin body_color() {
    background: linear-gradient(
        180deg,
        rgba(102, 255, 237, 1) 0%,
        rgba(255, 238, 178, 1) 100%
    );

    [data-theme='dark'] & {
        background: linear-gradient(
            180.75deg,
            rgba(43, 68, 133, 1) 0%,
            rgba(175, 202, 255, 1) 100%
        );
    }
}

.switch {
    width: 60px;
    height: 25px;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &-circle {
        height: 20px;
        aspect-ratio: 1;
        border-radius: 50%;
        position: absolute;
        top: 2.5px;
        z-index: 2;
        transition: all 0.5s;
        @include circle_color();
    }

    &-body {
        width: 100%;
        height: 100%;
        box-shadow: inset 0px 6px 8px 3px rgba(0, 0, 0, 0.25);
        @include body_color();
    }
}
</style>
