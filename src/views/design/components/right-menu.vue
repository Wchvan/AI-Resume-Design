<template>
    <div class="menu">
        <div class="menu-title">
            {{ props.templates[props.templateEditIndex].name }}
        </div>

        <el-button-group class="menu-btns">
            <el-button
                class="menu-btns-item"
                :type="!dataMode ? 'primary' : ''"
                @click="dataMode = false"
                >{{ $t('design.styleConfiguration') }}</el-button
            >
            <el-button
                class="menu-btns-item"
                :type="dataMode ? 'primary' : ''"
                @click="dataMode = true"
                >{{ $t('design.dataConfiguration') }}</el-button
            >
        </el-button-group>
    </div>
</template>

<script setup lang="ts">
import { Template } from '@/schema/default';
import { ref } from 'vue';

const props = defineProps<{
    templates: Template[];
    templateEditIndex: number;
}>();

const dataMode = ref<boolean>(true);
</script>

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
    padding: 40px 24px 24px 24px;
    position: relative;

    &-title {
        width: 100%;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
    }

    &-btns {
        width: 100%;
        height: 36px;
        margin-top: 30px;

        &-item {
            width: 50%;
            height: 100%;
            border-radius: 16px;
        }
    }
}
</style>
