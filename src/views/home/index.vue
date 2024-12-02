<template>
    <div class="home">
        <div class="home-vector-l"></div>
        <div class="home-vector-r"></div>
        <img class="home-star" :src="Star" />
        <div class="home-main">
            <div class="home-main__title">{{ $t('common.name') }}</div>
            <div class="home-main__subtitle">——{{ $t('home.subtitle') }}</div>
            <div class="home-main__desc">{{ $t('home.desc') }}</div>
            <button class="home-main__button" @click="goDetail">
                <div class="home-main__button__text">
                    {{ $t('home.explore') }}
                </div>
                <div class="home-main__button__inner"></div>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Star from '@/assets/home/star.png';
import { useRouter } from 'vue-router';
const router = useRouter();

function goDetail() {
    router.push('/design');
}
</script>

<style lang="scss" scoped>
.home {
    width: 100vw;
    height: 100vh;
    background: rgb(15, 23, 42);
    position: relative;
    overflow: hidden;

    &-vector-l {
        width: 60%;
        height: 100%;
        position: absolute;
        transform: rotate(175.43deg);
        background: linear-gradient(
            0deg,
            rgba(70, 10, 110, 0.9) 0%,
            rgba(118, 80, 227, 0) 100%
        );
        filter: blur(120px);
    }

    &-vector-r {
        width: 60%;
        height: 60%;
        position: absolute;
        z-index: 2;
        right: 0;
        bottom: 0;
        background: inherit;
        filter: blur(120px);
    }

    &-star {
        width: 35%;
        aspect-ratio: 1;
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
    }

    &-main {
        position: absolute;
        left: 10%;
        top: 30%;
        width: 40%;
        z-index: 5;

        &__title,
        &__subtitle {
            font-size: 54px;
            font-weight: 400;
            letter-spacing: -1.62px;
            line-height: 64px;
        }

        &__desc {
            font-size: 24px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 52px;
            margin: 50px 0;
        }

        &__button {
            width: 180px;
            height: 50px;
            opacity: 1;
            border-radius: 130px;
            background: rgba(121, 72, 234, 1);
            border: 0.5px solid rgba(255, 255, 255, 1);
            position: relative;

            &__text {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
                font-size: 20px;
                letter-spacing: 0px;
                line-height: 24px;
            }

            &__inner {
                width: 160px;
                height: 35px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border-radius: 130px;
                background: rgba(49, 39, 115, 1);
                filter: blur(12.7px);
            }
        }
    }
}
</style>
