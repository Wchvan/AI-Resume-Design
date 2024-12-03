<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :width="props.size"
        :height="props.size"
        viewBox="0 0 13.21002197265625 13"
        fill="none"
    >
        <path
            d="M11.2096 6.00002L11.2096 6.99998L1.91466 6.99998L5.06181 10.1465L4.35454 10.8536L0 6.5L4.35454 2.14643L5.06181 2.8535L1.91466 6.00002L11.2096 6.00002ZM13.21 13L12.2097 13L12.2097 0L13.21 0L13.21 13Z"
            fill-rule="evenodd"
        ></path>
    </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
    size: number;
}>();
</script>

<style lang="scss" scoped></style>
