<template>
    <div class="menu"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '/src/styles/mixins.scss' as *;

.menu {
    width: 25%;
    height: 100%;
    @include nav_color();
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08),
        0px 4px 32px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>
