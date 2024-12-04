<template>
    <div class="menu" :class="shrink && 'shrink'">
        <div class="menu-top">
            <div v-show="!shrink" class="menu-top__text">
                {{ templates[0].data[0].name }} {{ $t('design.leftMenuTitle') }}
            </div>
            <div class="menu-top__label" @click="shrink = !shrink">
                <leftSvg :size="20" :class="shrink && 'rotate-180'" />
            </div>
        </div>
        <div
            v-for="template in props.templates"
            :key="template.name"
            class="menu-item"
        >
            <div class="menu-item-title">
                <component :is="template.icon" class="menu-item-title__icon" />
                <div v-show="!shrink" class="menu-item-title__text">
                    {{ template.name }}
                </div>
            </div>
            <el-switch
                v-show="!shrink"
                v-model="template.display"
                class="menu-item__switch"
                style="--el-switch-on-color: #13ce66"
            />
        </div>

        <div v-show="!shrink" class="btn-group">
            <el-button class="btn-group-item" style="color: rgb(0, 60, 255)">{{
                $t('design.preview')
            }}</el-button>
            <el-button class="btn-group-item" color="rgba(121, 72, 234, 1)">{{
                $t('design.download')
            }}</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import leftSvg from '@/icon/left.vue';
import { Template } from '@/schema/default';
import { ref } from 'vue';

const props = defineProps<{
    templates: Template[];
}>();

const shrink = ref<boolean>(false);
</script>

<style lang="scss" scoped>
@use '/src/styles/mixins.scss' as *;

.menu {
    width: 20%;
    height: 100%;
    @include nav_color();
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08),
        0px 4px 32px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 32px 24px 24px 24px;
    position: relative;

    &.shrink {
        width: 5%;

        .menu-item {
            border: 0;
            padding: 0;
        }
    }

    &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-size: 20px;
        height: 60px;
        margin-bottom: 20px;

        &__label {
            cursor: pointer;
        }
    }

    &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 35px 20px;
        width: 100%;
        font-size: 18px;
        height: 60px;
        border-bottom: 1px solid rgba(166, 166, 166, 0.5);

        &-title {
            display: inline-flex;
            align-items: center;
            font-size: inherit;

            &__icon {
                width: 1.2em;
                height: 1.2em;
                margin-right: 4px;
            }
        }
    }

    .btn-group {
        position: absolute;
        bottom: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
        left: -1px;

        &-item {
            border-radius: 15px;
            height: 40px;
            width: 80px;
        }
    }
}
</style>
