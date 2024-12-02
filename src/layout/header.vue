<template>
    <div
        class="header"
        :class="[
            hidden ? 'nav-hidden' : '',
            route.meta.navTransparent ? 'transparent' : 'nav-bg',
        ]"
    >
        <div class="title" @click="$router.push('/')">
            <el-avatar :src="LOGO" style="margin-right: 10px" />
            <span>简小历 - AI 简历助手</span>
        </div>
        <div
            class="i18n header-item"
            style="cursor: pointer; margin-left: auto"
            @click="changeLanguage"
        >
            {{ $t('header.language') }}
        </div>
        <div v-show="!route.meta.navTransparent" class="theme header-item">
            <theme-switch></theme-switch>
        </div>
        <div class="btn-group">
            <el-button class="btn-group-item" style="color: rgb(0, 60, 255)">{{
                $t('header.Login')
            }}</el-button>
            <el-button class="btn-group-item" color="rgba(121, 72, 234, 1)">{{
                $t('header.SignUp')
            }}</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useWindowScroll } from '@vueuse/core';
import { useRoute } from 'vue-router';
import LOGO from '@/assets/logo.png';
import themeSwitch from '@/components/theme-switch.vue';
const route = useRoute();

// i18n
const I18n = useI18n();
localStorage.getItem('i18n')
    ? (I18n.locale.value = localStorage.getItem('i18n') as string)
    : '';

const changeLanguage = () => {
    if (I18n.locale.value === 'en-us') {
        I18n.locale.value = 'zh-cn';
        localStorage.setItem('i18n', 'zh-cn');
    } else {
        I18n.locale.value = 'en-us';
        localStorage.setItem('i18n', 'en-us');
    }
};

// navBg
const hidden = ref<boolean>(false);
const { y } = useWindowScroll();
watch(y, (newVal, oldVal) => {
    if (newVal < 80) {
        if (hidden.value) {
            hidden.value = true;
        }
    } else {
        if (newVal > oldVal && !hidden.value) {
            hidden.value = true;
        } else if (newVal < oldVal - 1 && hidden.value) {
            hidden.value = false;
        }
    }
});
</script>

<style lang="scss" scoped>
@use '/src/styles/mixins.scss' as *;

.header {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    width: 100%;
    z-index: 999;
    height: 80px;
    font-size: 18px;
    transition: all 0.5s;
    opacity: 1;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08),
        0px 4px 24px rgba(0, 0, 0, 0.08);
    align-items: center;

    .title {
        font-size: 28px;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
        margin-left: 50px;
        font-weight: 600;
        margin-right: 80px;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        @include font_theme_color();
    }

    &-item {
        margin-right: 15px;
        display: flex;
        align-items: center;
        font-weight: 400;
    }

    .btn-group {
        margin-right: 15px;

        &-item {
            border-radius: 15px;
            height: 40px;
            width: 80px;
        }
    }
}

.nav-hidden {
    transition: all 0.5s;
    opacity: 0;
}

.nav-bg {
    @include nav_color();
}

.transparent {
    background: transparent;
    box-shadow: unset;
}

.avatar {
    width: 25px;
    height: 25px;
}
</style>
