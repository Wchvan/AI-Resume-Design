<template>
    <my-header ref="myHeaderRef"></my-header>
    <main class="main">
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import myHeader from './header.vue';
</script>

<style lang="scss" scoped>
main {
    width: 100%;
    min-height: 100vh;
    height: auto;
}
</style>
