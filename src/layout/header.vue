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
        <div v-if="!userStore.username" class="btn-group">
            <el-button
                class="btn-group-item"
                color="rgba(121, 72, 234, 1)"
                @click="visible = true"
                >{{ $t('header.login') }}</el-button
            >
        </div>
        <div
            v-else
            class="user"
            @mouseenter="toggleMenu"
            @mouseleave="toggleMenu"
        >
            <div class="user-container">
                <el-image :src="Avatar" class="user-avatar" />
                <div class="user-desc">
                    <div class="user-desc-name">{{ userStore.username }}</div>
                    <div class="user-desc-welcome">
                        {{ $t('header.welcome') + userStore.username }}
                    </div>
                </div>
            </div>

            <div v-if="userMenuFlag" class="user-menu">
                <ul class="user-menu_wrapper">
                    <li class="user-menu_item" @click="logout">退出登录</li>
                </ul>
            </div>
        </div>
    </div>
    <LoginRegisterCard
        v-model:visible="visible"
        :path="toPath"
    ></LoginRegisterCard>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useWindowScroll } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import LOGO from '@/assets/logo.png';
import themeSwitch from '@/components/theme-switch.vue';
import LoginRegisterCard from '@/components/login-register-card.vue';
import useUserStore from '@/store/user';
import Avatar from '@/assets/avatar.png';
import eventBus from '@/utils/eventBus';

const route = useRoute();
const userStore = useUserStore();
const userMenuFlag = ref(false);

// login
const visible = ref(false);
const toPath = ref('');
onMounted(() => {
    eventBus.on('login', (payload) => {
        toPath.value = (payload as { path: string }).path;
        visible.value = true;
    });
});
onUnmounted(() => {
    eventBus.off('login');
});

// logout
const logout = () => {
    userStore.logout();
    useRouter().replace('/home');
};

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

// user
const toggleMenu = () => {
    userMenuFlag.value = !userMenuFlag.value;
};
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
    .user {
        height: 100%;
        margin-right: 20px;
        &-container {
            display: flex;
            align-items: center;
            height: 100%;
        }

        &-avatar {
            height: 60%;
            aspect-ratio: 1;
            margin-right: 10px;
        }

        &-desc {
            &-name {
                font-size: 18px;
                font-weight: bold;
            }
            &-welcome {
                font-size: 10px;
                @include font_color_secondary();
            }
        }
        &-menu {
            padding: 0 2.5rem;
            font-size: 1rem;
            font-weight: 500;
            line-height: 3rem;
            top: 5rem;
            border-radius: 0 0 10px 10px;
            right: 1rem;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.7);
            position: absolute;
            z-index: 10000;

            &_item {
                &:hover {
                    color: #409eff;
                }
                &:not(:last-child) {
                    border-bottom: 1px solid rgba(17, 17, 17, 0.3);
                }
            }
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
</style>
