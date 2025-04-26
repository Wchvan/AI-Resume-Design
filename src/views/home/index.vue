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
        <div class="home-section-1">
            <div>“</div>
            <div>{{ $t('home.section1') }}</div>
            <div>”</div>
        </div>
        <div class="home-section-2">
            <div class="home-section-2-header">
                <div>{{ $t('home.about') }}</div>
                <div>{{ $t('home.introduction') }}</div>
            </div>
            <div class="home-section-2-item">
                <img :src="Book" class="home-section-2-item__img" />
                <div class="home-section-2-item__text">
                    <div class="home-section-2-item__text-header">AI帮助</div>
                    <div class="home-section-2-item__text-item">
                        一方面可以通过AI帮忙生成简历数据模板通过AI帮忙对简历的内容进行润色美化，生成更优质的内容.
                    </div>
                    <div class="home-section-2-item__text-item">
                        另一方面可以通过AI分析简历通过AI分析简历发现自己的不足点，给出指导建议.
                    </div>
                </div>
            </div>

            <div class="home-section-2-item">
                <div class="home-section-2-item__text">
                    <div class="home-section-2-item__text-header">
                        编辑-预览-生成
                    </div>
                    <div class="home-section-2-item__text-item">
                        通过对简历模板的数据和样式进行编辑，在线预览编辑后的简历样式
                    </div>
                    <div class="home-section-2-item__text-item">
                        待编辑好简历内容和样式之后，可以生成PDF文件和图片文件用于使用
                    </div>
                </div>
                <img :src="Email" class="home-section-2-item__img" />
            </div>
            <div class="home-section-2-item-vector"></div>
        </div>
        <div class="home-section-3">
            <div class="home-section-3-container">
                <div class="home-section-3-container-header">
                    <div>{{ $t('home.team') }}</div>
                    <div style="font-size: 40px">
                        {{ $t('home.introduction') }}
                    </div>
                </div>
                <div class="home-section-3-container-main">
                    <img
                        :src="Person"
                        class="home-section-3-container-main__img"
                    />
                    <div class="home-section-3-container-main__text">
                        <div class="home-section-3-container-main__text-item">
                            Van
                        </div>
                        <div class="home-section-3-container-main__text-item">
                            电子科技大学
                        </div>
                        <div class="home-section-3-container-main__text-item">
                            Wchvan@163.com
                        </div>
                    </div>
                </div>
                <div class="home-section-3-container-circle1"></div>
                <div class="home-section-3-container-circle2"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Star from '@/assets/home/star.png';
import useUserStore from '@/store/user';
import eventBus from '@/utils/eventBus';
import { useRouter } from 'vue-router';
import Book from '@/assets/home/book.png';
import Email from '@/assets/home/email.png';
import Person from '@/assets/home/person.png';
const router = useRouter();

function goDetail() {
    if (useUserStore().username) {
        router.push('/design');
    }
    eventBus.emit('login', { path: '/design' });
}
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    min-height: 100vh;
    background: rgb(15, 23, 42);
    position: relative;
    overflow: hidden;

    &-vector-l {
        width: 60vw;
        height: 100vh;
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
        width: 60vw;
        height: 60vh;
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
        top: 50vh;
        transform: translateY(-50%);
        z-index: 3;
    }

    &-main {
        position: absolute;
        left: 10%;
        top: 30vh;
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

    &-section-1 {
        position: relative;
        z-index: 10;
        margin-top: 100vh;
        background: linear-gradient(
            90.05deg,
            rgba(83, 28, 125, 1) 0%,
            rgba(16, 41, 130, 1) 100%
        );
        width: 100vw;
        height: 20vh;
        display: flex;
        padding: 0 50px;
        align-items: center;
        justify-content: space-around;
        font-size: 50px;
    }
    &-section-2 {
        position: relative;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        padding: 5vh 0;
        &-header {
            width: 100%;
            text-align: center;
            height: 10vh;
            font-size: 40px;
        }
        &-item {
            display: flex;
            width: 100vw;
            justify-content: center;
            height: 40vh;
            gap: 15vw;
            align-items: center;
            &__img {
                width: 15vw;
            }
            &__text {
                font-size: 20px;
                width: 20vw;
                &-header {
                    font-size: 40px;
                }
                &-item {
                    margin-top: 30px;
                }
            }
        }
        &-item-vector {
            position: absolute;
            height: 30vh;
            width: 30vw;
            bottom: 10vh;
            right: 10vw;
            opacity: 1;
            transform: rotate(86.52deg);
            background: linear-gradient(
                180deg,
                rgba(22, 5, 56, 0.9) 0%,
                rgba(94, 79, 227, 0) 100%
            );
            filter: blur(30vw);
        }
    }
    &-section-3 {
        position: relative;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &-container {
            border-radius: 3vw;
            width: 80vw;
            height: 80vh;
            position: relative;
            overflow: hidden;

            &-header {
                width: 100%;
                text-align: center;
                height: 10vh;
                font-size: 24px;
                margin-top: 10vh;
            }

            &-main {
                display: flex;
                justify-content: center;
                height: 40vh;
                width: 80vw;
                gap: 3vw;
                align-items: center;
                &__img {
                    width: 10vw;
                }
                &__text {
                    font-size: 30px;
                }
            }
            &-circle1 {
                position: absolute;
                width: 50vw;
                height: 50vh;
                bottom: -25vh;
                left: 15vw;
                opacity: 1;
                background: rgba(162, 115, 255, 0.2);
                filter: blur(5vw);
                border-radius: 50%;
            }
            &-circle2 {
                position: absolute;
                width: 90vw;
                height: 100vh;
                top: 10vh;
                left: -5vw;
                opacity: 1;
                background: rgba(162, 115, 255, 0.2);
                filter: blur(50vw);
                border-radius: 50%;
            }
        }
    }
}
</style>
